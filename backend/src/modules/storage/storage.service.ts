import { randomUUID } from "node:crypto";
import { supabaseAdmin } from "../../lib/supabase.js";

const PRIVATE_BUCKETS = new Set([
  "avatars",
  "driver-documents",
  "prescriptions",
]);

const PUBLIC_BUCKETS = new Set([
  "merchant-media",
  "service-media",
]);

function assertBucket(bucket: string) {
  if (!PRIVATE_BUCKETS.has(bucket) && !PUBLIC_BUCKETS.has(bucket)) {
    throw new Error("Unsupported Safari storage bucket.");
  }
}

function safeFilename(filename: string) {
  const normalized = filename
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized || "upload.bin";
}

export async function createUploadPlan(
  userId: string,
  input: {
    bucket: string;
    entityType:
      | "profile"
      | "driver_document"
      | "prescription"
      | "restaurant"
      | "commerce_store"
      | "commerce_product"
      | "service_provider"
      | "provider_service";
    entityId?: string | null;
    filename: string;
    mimeType?: string | null;
    sizeBytes?: number | null;
  },
) {
  assertBucket(input.bucket);

  const objectPath =
    `${userId}/${input.entityType}/` +
    `${randomUUID()}-${safeFilename(input.filename)}`;

  const { data: asset, error: assetError } = await supabaseAdmin
    .from("media_assets")
    .insert({
      owner_user_id: userId,
      entity_type: input.entityType,
      entity_id: input.entityId ?? null,
      bucket_name: input.bucket,
      object_path: objectPath,
      original_filename: input.filename,
      mime_type: input.mimeType ?? null,
      size_bytes: input.sizeBytes ?? null,
      visibility: PUBLIC_BUCKETS.has(input.bucket)
        ? "public"
        : "private",
      status: "pending",
    })
    .select("*")
    .single();

  if (assetError) throw new Error(assetError.message);

  const { data, error } = await supabaseAdmin.storage
    .from(input.bucket)
    .createSignedUploadUrl(objectPath);

  if (error) throw new Error(error.message);

  return {
    asset,
    upload: {
      path: data.path,
      token: data.token,
      signedUrl: data.signedUrl,
    },
  };
}

export async function completeUpload(
  userId: string,
  assetId: string,
) {
  const { data: asset, error: fetchError } = await supabaseAdmin
    .from("media_assets")
    .select("*")
    .eq("id", assetId)
    .eq("owner_user_id", userId)
    .single();

  if (fetchError || !asset)
    throw new Error("Safari media asset not found.");

  const { data: objects, error: objectError } = await supabaseAdmin.storage
    .from(asset.bucket_name)
    .list(
      asset.object_path.split("/").slice(0, -1).join("/"),
      {
        search: asset.object_path.split("/").at(-1),
        limit: 10,
      },
    );

  if (objectError) throw new Error(objectError.message);

  const filename = asset.object_path.split("/").at(-1);

  if (!objects.some((item) => item.name === filename)) {
    throw new Error("Safari upload has not reached storage yet.");
  }

  const { data, error } = await supabaseAdmin
    .from("media_assets")
    .update({
      status: "active",
      updated_at: new Date().toISOString(),
    })
    .eq("id", assetId)
    .eq("owner_user_id", userId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function createAssetReadUrl(
  userId: string,
  assetId: string,
  expiresIn = 900,
) {
  const { data: asset, error } = await supabaseAdmin
    .from("media_assets")
    .select("*")
    .eq("id", assetId)
    .single();

  if (error || !asset)
    throw new Error("Safari media asset not found.");

  if (
    asset.visibility === "private" &&
    asset.owner_user_id !== userId
  ) {
    throw new Error("You do not have access to this Safari media asset.");
  }

  if (asset.visibility === "public") {
    const { data } = supabaseAdmin.storage
      .from(asset.bucket_name)
      .getPublicUrl(asset.object_path);

    return {
      asset,
      url: data.publicUrl,
      expiresIn: null,
    };
  }

  const { data, error: signError } = await supabaseAdmin.storage
    .from(asset.bucket_name)
    .createSignedUrl(asset.object_path, expiresIn);

  if (signError) throw new Error(signError.message);

  return {
    asset,
    url: data.signedUrl,
    expiresIn,
  };
}

export async function deleteAsset(
  userId: string,
  assetId: string,
) {
  const { data: asset, error } = await supabaseAdmin
    .from("media_assets")
    .select("*")
    .eq("id", assetId)
    .eq("owner_user_id", userId)
    .single();

  if (error || !asset)
    throw new Error("Safari media asset not found.");

  const { error: storageError } = await supabaseAdmin.storage
    .from(asset.bucket_name)
    .remove([asset.object_path]);

  if (storageError) throw new Error(storageError.message);

  const { error: updateError } = await supabaseAdmin
    .from("media_assets")
    .update({
      status: "deleted",
      updated_at: new Date().toISOString(),
    })
    .eq("id", assetId);

  if (updateError) throw new Error(updateError.message);
}
