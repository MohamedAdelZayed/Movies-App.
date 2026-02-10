type Option = { label: string; value: string | number };

interface FilterDropdownProps {
  label: string;
  name: string;
  options: Option[];
  value: string | number;
  onChange: (name: string, value: string | number) => void;
}

export default function FilterDropdown({ label, name, options, value, onChange } : FilterDropdownProps ) {

 return (
    <div>
      <label className="block mb-2 ml-1 text-sm">{label}</label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)} 
        className="bg-[#252525] rounded-md px-3 py-2 text-white w-full focus:outline-none"
      >
        <option value="">All</option>
        {options?.map((opt : Option) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );

}