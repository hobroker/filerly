interface Props {
  dirname: string;
}

export const BreadcrumbText = ({ dirname }: Props) => {
  return <span className="text-sm text-gray-600">{dirname}</span>;
};
