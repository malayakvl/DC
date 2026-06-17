export default function Checkbox({ className = '', ...props }) {
  return (
    <input
      type="checkbox"
      className={
        'rounded border-gray-300 text-[#0ea5a4] shadow-sm focus:ring-gray-500 ' + className
      }
      {...props}
    />
  );
}
