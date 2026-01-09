import React from "react";

type Option = {
    value: string;
    label: string;
};

type SelectFieldProps = {
    label: string;
    name: string;
    options: Option[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectField({
    label,
    name,
    options,
    value,
    onChange,
}: SelectFieldProps) {

    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={name}
                className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                        focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="">Selecione um produto</option>

                {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
                ))}
            </select>
        </div>
    );

}
