export function formatCNPJ(value: string): string {
  // Remove tudo que não for número
  if (value === null) return "";

  const digits = value.replace(/\D/g, "");

  // Limita a 14 dígitos
  const cnpj = digits.slice(0, 14);

  return cnpj
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

export function unformatCNPJ(value: string): string {
  return value.replace(/\D/g, "");
}
