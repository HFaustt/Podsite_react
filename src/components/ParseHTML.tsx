import parse from "html-react-parser";

interface dataProps {
  data: string;
}

export default function ParseHTML({ data }: dataProps) {
  console.log(data);

  return <div>{parse(data)}</div>;
}
