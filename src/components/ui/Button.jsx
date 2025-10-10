export function Button({ children, variant = 'default', ...props }) {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors";
  const variantClasses = variant === 'outline'
    ? "border border-slate-400 hover:bg-slate-200 dark:border-slate-600 dark:hover:bg-slate-700"
    : "bg-slate-800 text-white hover:bg-slate-900 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300";

  return (
    <button className={`${baseClasses} ${variantClasses}`} {...props}>
      {children}
    </button>
  );
}
