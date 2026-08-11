import {
  Upload,
} from "lucide-react";

import {
  useSettingsStore,
} from "../../store/settingsStore";

import SettingToggle from "./SettingToggle";
import SettingsSectionHeader from "./SettingsSectionHeader";

export default function UploadSettingsPanel({
  canEdit,
}: {
  canEdit: boolean;
}) {
  const settings =
    useSettingsStore(
      (state) =>
        state.settings.uploads,
    );

  const update =
    useSettingsStore(
      (state) =>
        state.updateUploads,
    );

  return (
    <section className="safari-card p-6">
      <SettingsSectionHeader
        icon={Upload}
        eyebrow="Files"
        title="Upload Settings"
        description="Control file limits for merchants, drivers, products, prescriptions and documents."
      />

      <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <Field
          label="Max Image MB"
          value={
            settings.maxImageSizeMb
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              maxImageSizeMb:
                value,
            })
          }
        />

        <Field
          label="Max Document MB"
          value={
            settings.maxDocumentSizeMb
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              maxDocumentSizeMb:
                value,
            })
          }
        />

        <Field
          label="Max Video MB"
          value={
            settings.maxVideoSizeMb
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              maxVideoSizeMb:
                value,
            })
          }
        />

        <Field
          label="Product Images"
          value={
            settings.maxImagesPerProduct
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              maxImagesPerProduct:
                value,
            })
          }
        />

        <Field
          label="Vehicle Photos"
          value={
            settings.maxVehiclePhotos
          }
          disabled={!canEdit}
          onChange={(value) =>
            update({
              maxVehiclePhotos:
                value,
            })
          }
        />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label>
          <span className="text-xs font-semibold text-slate-500">
            Image Extensions
          </span>

          <input
            value={settings.allowedImageExtensions.join(
              ", ",
            )}
            disabled={!canEdit}
            onChange={(event) =>
              update({
                allowedImageExtensions:
                  parseList(
                    event.target
                      .value,
                  ),
              })
            }
            className="safari-input mt-2"
          />
        </label>

        <label>
          <span className="text-xs font-semibold text-slate-500">
            Document Extensions
          </span>

          <input
            value={settings.allowedDocumentExtensions.join(
              ", ",
            )}
            disabled={!canEdit}
            onChange={(event) =>
              update({
                allowedDocumentExtensions:
                  parseList(
                    event.target
                      .value,
                  ),
              })
            }
            className="safari-input mt-2"
          />
        </label>
      </div>

      <div className="mt-5">
        <SettingToggle
          label="Image Compression"
          description="Compress uploaded images before permanent storage."
          checked={
            settings.imageCompressionEnabled
          }
          disabled={!canEdit}
          onChange={(checked) =>
            update({
              imageCompressionEnabled:
                checked,
            })
          }
        />
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  disabled,
  onChange,
}: {
  label: string;

  value: number;

  disabled: boolean;

  onChange: (
    value: number,
  ) => void;
}) {
  return (
    <label>
      <span className="text-xs font-semibold text-slate-500">
        {label}
      </span>

      <input
        type="number"
        min="0"
        value={value}
        disabled={disabled}
        onChange={(event) =>
          onChange(
            Number(
              event.target.value,
            ),
          )
        }
        className="safari-input mt-2"
      />
    </label>
  );
}

function parseList(
  value: string,
) {
  return value
    .split(",")
    .map((item) =>
      item.trim(),
    )
    .filter(Boolean);
}