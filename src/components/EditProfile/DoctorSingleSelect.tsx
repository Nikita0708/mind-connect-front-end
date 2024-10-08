"use client";

import React from "react";
import { Select, SelectItem, Selection } from "@nextui-org/react";

interface SelectOption {
  key: string;
  label: string;
}

interface DoctorSingleSelectProps {
  label: string;
  placeholder: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
  isDisabled?: boolean;
}

export default function DoctorSingleSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
  className = "w-[350px]",
  error,
  isDisabled = false,
}: DoctorSingleSelectProps) {
  const handleSelectionChange = (keys: Selection) => {
    const selectedKey = Array.from(keys)[0] as string;
    onChange(selectedKey);
  };

  return (
    <Select
      label={label}
      placeholder={placeholder}
      selectionMode="single"
      className={className}
      selectedKeys={value ? [value] : []}
      onSelectionChange={handleSelectionChange}
      isDisabled={isDisabled}
      isInvalid={!!error}
      errorMessage={error}
    >
      {options.map((option) => (
        <SelectItem key={option.key} value={option.key}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
}
