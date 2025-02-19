interface FormInputProps {
  label: string
  type?: string
  placeholder: string
  name: string
  className?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function FormInput({
  label,
  type = "text",
  placeholder,
  name,
  className = "",
  value,
  onChange,
}: FormInputProps) {
  return (
    <div className={className}>
      <label className="block text-[16px] text-[#1A202C] font-semibold mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-[48px] px-4 rounded-[10px] bg-[#F6F7F9] border border-[#C3D4E966] focus:outline-none focus:border-[#3563E9] placeholder-[#90A3BF]"
      />
    </div>
  )
}

