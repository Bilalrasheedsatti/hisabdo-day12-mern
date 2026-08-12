import type { HTMLAttributes, ReactNode } from "react";

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export default function Table({ children, className = "", ...rest }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full min-w-[640px] border-collapse text-left ${className}`} {...rest}>
        {children}
      </table>
    </div>
  );
}

interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export function TableHead({ children, className = "", ...rest }: TableHeadProps) {
  return (
    <thead className={`border-b-2 border-ink text-xs uppercase tracking-wider text-ink-faint ${className}`} {...rest}>
      {children}
    </thead>
  );
}

interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export function TableBody({ children, className = "", ...rest }: TableBodyProps) {
  return (
    <tbody className={className} {...rest}>
      {children}
    </tbody>
  );
}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

export function TableRow({ children, className = "", ...rest }: TableRowProps) {
  return (
    <tr className={`border-b border-gray-100 last:border-0 ${className}`} {...rest}>
      {children}
    </tr>
  );
}

interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  align?: "left" | "right" | "center";
}

export function TableCell({ children, align = "left", className = "", ...rest }: TableCellProps) {
  const alignClasses = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  };

  return (
    <td className={`py-3 pr-4 text-sm ${alignClasses[align]} ${className}`} {...rest}>
      {children}
    </td>
  );
}

interface TableHeaderCellProps extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  align?: "left" | "right" | "center";
}

export function TableHeaderCell({ children, align = "left", className = "", ...rest }: TableHeaderCellProps) {
  const alignClasses = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  };

  return (
    <th className={`pb-3 pr-4 font-semibold ${alignClasses[align]} ${className}`} {...rest}>
      {children}
    </th>
  );
}
