import { cn } from "~/lib/utils";

const Field: React.FC<{
  label: string;
  value?: string;
  children?: React.ReactNode;
  className?: string;
  labelClassName?: string;
}> = ({ label, value, children, className, labelClassName }) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <span className={cn("mb-2 text-lg font-bold", labelClassName)}>
        {label}
      </span>
      {!children ? <p className="text-lg">{value}</p> : children}
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <div className="mb-24 gap-10 pl-4 pr-20 pt-20">
      <h1 className="mb-6 text-3xl font-bold">Sydney Sweeney</h1>
      <Field
        label="Biography"
        value="lorem ipsum dolor sit amet consectetur adipisicing elit. Officia placeat, sapiente voluptatum quisquam ipsum quam accusamus expedita. Repellendus laboriosam unde, dolor recusandae dolorem minus eum ipsam perspiciatis maxime rem iste."
        className="mb-4"
      />
      <Field label="Personal Info">
        <div className="flex gap-10">
          <Field label="Birthday" labelClassName="text-md" value="10/10/1990" />
          <Field
            label="Nationality"
            labelClassName="text-md"
            value="United States"
          />
        </div>
      </Field>
    </div>
  );
};

export { Header };
