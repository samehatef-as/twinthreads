import { cn } from "@/lib/utils";

interface Props {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  error?: string | undefined;
  required?: boolean;
  defaultValue?: string;
  className?: string;
  options?: string[];
}

const base =
  "mt-2 w-full border-0 border-b border-input bg-transparent py-3 text-sm outline-none transition-colors focus:border-foreground";

export function Field({
  label,
  name,
  type = "text",
  textarea,
  error,
  required,
  className,
  options,
}: Props) {
  const id = `f-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow text-muted-foreground">
        {label}
        {required && " *"}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          className={cn(base, "resize-none")}
          aria-invalid={!!error}
        />
      ) : options ? (
        <select id={id} name={name} className={base} aria-invalid={!!error} defaultValue="">
          <option value="" disabled>
            Select
          </option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input id={id} name={name} type={type} className={base} aria-invalid={!!error} />
      )}
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
