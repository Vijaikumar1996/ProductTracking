
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import { Controller } from "react-hook-form";

export default function TimeField({
  name,
  control,
  label,
  placeholder = "Select time",
  error,
  required = false,
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
        render={({ field }) => (
          <Flatpickr
            options={{
              enableTime: true,
              noCalendar: true,
              dateFormat: "H:i",
              time_24hr: true,
            }}
            value={field.value || ""}
            onChange={(date) => {
              if (!date || !date.length) {
                field.onChange("");
                return;
              }

              const d = date[0];

              const time =
                d.getHours().toString().padStart(2, "0") +
                ":" +
                d.getMinutes().toString().padStart(2, "0");

              field.onChange(time);
            }}
            placeholder={placeholder}
            className="w-full border px-3 py-2 rounded"
          />
        )}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}

