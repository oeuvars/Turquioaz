import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-[90%] mx-auto auto-rows-[25rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      "transform-gpu bg-black [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="size-10 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="phone:text-lg tablet:text-xl font-semibold">
         <span className="gradient-text">{name}</span>
      </h3>
      <p className="max-w-lg text-neutral-500 font-medium phone:text-sm tablet:text-base">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Button variant="ghost" size="sm" className="pointer-events-auto">
        <Link to={href} className="flex gap-2">
          <p className="">{cta}</p>
          <ArrowRightIcon className=" size-4 my-auto" />
        </Link>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-neutral-950/[.05]" />
  </div>
);

export { BentoCard, BentoGrid };
