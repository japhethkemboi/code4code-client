export const InputComponent = ({
  label,
  name,
  type,
  labelClasses,
  readOnly,
  value,
  onChange,
  inputClasses,
  placeholder,
  options,
  defaultValue,
  required = true,
  maxLength,
  minLength,
  maxNumber,
  minNumber,
}: {
  label?: string;
  name?: string;
  type?: string;
  readOnly?: boolean;
  required?: boolean;
  options?: Array<{ id: string; disabled?: boolean; value: string; selected?: boolean }>;
  labelClasses?: string;
  inputClasses?: string;
  placeholder?: string;
  defaultValue?: string;
  maxLength?: number;
  minLength?: number;
  value?: string;
  maxNumber?: number;
  minNumber?: number;
  onChange?: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col items-start w-full gap-4">
      {label && <h4 className={`md:text-lg ${labelClasses}`}>{label}</h4>}
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          maxLength={maxLength}
          minLength={minLength}
          readOnly={readOnly}
          placeholder={placeholder}
          defaultValue={defaultValue}
          required={required}
          className={`w-full p-3 md:p-4 border border-black/50 bg-inherit rounded ${inputClasses}`}
        />
      ) : type === "select" ? (
        <select
          onChange={(e) => onChange && onChange(e.target.value)}
          className={`w-full p-3 md:p-4 border border-black/50 bg-inherit rounded ${inputClasses}`}
          name={name}
          disabled={readOnly}
          required={required}
          aria-placeholder={placeholder}
          defaultValue={defaultValue}
        >
          {options?.map((option) => (
            <option selected={option.selected} disabled={option.disabled} key={option.id} value={option.id}>
              {option.value}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type !== "number" ? type : ""}
          name={name}
          value={value}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          onKeyPress={(e) => {
            if (type === "number") {
              if (
                (maxNumber && parseInt(e.key) > maxNumber) ||
                (minNumber && parseInt(e.key) < minNumber) ||
                !/^[0-9]$/.test(e.key)
              ) {
                e.preventDefault();
              }
            } else if (type === "puretext") {
              if (!/^[a-z]$/.test(e.key.toLowerCase())) {
                e.preventDefault();
              }
            } else if (type === "username") {
              if (/[^\w.-]/.test(e.key.toLowerCase())) {
                e.preventDefault();
              }
            }
          }}
          onPaste={(e) => {
            if (type === "number") {
              if (
                (maxNumber && parseInt(e.clipboardData.getData("text")) > maxNumber) ||
                (minNumber && parseInt(e.clipboardData.getData("text")) < minNumber) ||
                !/^[0-9]$/.test(e.clipboardData.getData("text"))
              ) {
                e.preventDefault();
              }
            } else if (type === "puretext") {
              if (!/^[a-z]$/.test(e.clipboardData.getData("text").toLowerCase())) {
                e.preventDefault();
              }
            } else if (type === "username") {
              if (/[^\w.-]/.test(e.clipboardData.getData("text").toLowerCase())) {
                e.preventDefault();
              }
            }
          }}
          onChange={(e) => onChange && onChange(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={`w-full p-3 md:p-4 border border-black/50 bg-inherit rounded ${inputClasses}`}
        />
      )}
    </div>
  );
};
