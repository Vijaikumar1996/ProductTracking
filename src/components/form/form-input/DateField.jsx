import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import "flatpickr/dist/plugins/monthSelect/style.css";
import { Controller } from "react-hook-form";

export default function DateField({
  name,
  control,
  label,
  required = false,
  mode = "date", // 🔥 date | month
  onValueChange, // optional callback
  minDate,
}) {
  return (
    <div>
      {label && (
        <label className="block mb-1 text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Flatpickr
              options={{
                dateFormat: mode === "month" ? "Y-m" : "Y-m-d",
                minDate: minDate,
                plugins:
                  mode === "month"
                    ? [
                      new monthSelectPlugin({
                        shorthand: true,
                        dateFormat: "Y-m",
                        altFormat: "F Y",
                      }),
                    ]
                    : [],
              }}
              value={field.value || ""}
              onChange={(date) => {
                const d = date?.[0];

                if (!d) {
                  field.onChange("");
                  onValueChange?.("");
                  return;
                }

                let formatted = "";

                if (mode === "month") {
                  formatted =
                    d.getFullYear() +
                    "-" +
                    String(d.getMonth() + 1).padStart(2, "0") +
                    "-01"; // 🔥 important for your backend
                } else {
                  formatted =
                    d.getFullYear() +
                    "-" +
                    String(d.getMonth() + 1).padStart(2, "0") +
                    "-" +
                    String(d.getDate()).padStart(2, "0");
                }

                field.onChange(formatted);
                onValueChange?.(formatted);
              }}
              className={`w-full border px-3 py-2 rounded ${fieldState.error ? "border-red-500" : ""
                }`}
            />

            {fieldState.error && (
              <p className="text-red-500 text-sm mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}