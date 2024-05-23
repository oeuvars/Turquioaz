import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import Globe from "@/components/ui/globe";
import Marquee from "@/components/ui/marquee";
import { CalendarIcon, FileTextIcon, GlobeIcon, InputIcon } from "@radix-ui/react-icons";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import TextShimmer from "@/components/ui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";

const files = [
  {
    name: "AM_DB9.pdf",
    body: "Invoice of your rent duration of Aston Martin DB9 for two business days, hope you enjoyed your ride.",
  },
  {
    name: "ModelX.pdf",
    body: "Invoice of your rent duration of Tesla Model X for two business days, hope you enjoyed your ride.",
  },
  {
    name: "UrusS.pdf",
    body: "Invoice of your rent duration of Lamborghini Urus X for two business days, hope you enjoyed your ride.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your invoices",
    description: "Get loyalty bonuses and discounts for future car rentals.",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-48 cursor-pointer overflow-hidden rounded-xl border p-4 tracking-tight font-normal",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: InputIcon,
    name: "Full Rental History",
    description: "Search through all your rentals in one place.",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Command className="absolute tracking-tighter right-10 top-10 w-[70%] origin-top translate-x-0 border [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10 transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none">
        <CommandInput placeholder="Type a invoice or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem className="text-neutral-200">AMB_DB9.pdf</CommandItem>
            <CommandItem className="text-neutral-200">458_Italia.pdf</CommandItem>
            <CommandItem className="text-neutral-200">718_Boxster.xlsx</CommandItem>
            <CommandItem className="text-neutral-200">M8_Competition_Coupé.pdf</CommandItem>
            <CommandItem className="text-neutral-200">R8_Coupé_Quattro.pdf</CommandItem>
            <CommandItem className="text-neutral-200">812_Competizione.pdf</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    ),
  },
  {
    Icon: GlobeIcon,
    name: "Multinational",
    description: "Supports 20+ locations and counting.",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Globe className="top-0 h-[600px] w-[600px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105 sm:left-40" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Filteration",
    description: "Use the calendar to filter our available rents.",
    className: "col-span-3 lg:col-span-1",
    href: "/",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105 border-dashed  border-neutral-700 transform-gpu blur-[1px] hover:blur-none"
      />
    ),
  },
];

export function Bento() {
  return (
   <div className="py-8">
      <div>
         <h1 className="phone:text-4xl lg:text-6xl font-semibold text-center tracking-tighter py-2 phone:my-2 tablet:my-5 phone:w-[80%] mx-auto text-wrap">
            <span className="landing-text px-1">Why Turqioaz</span>
         </h1>
         <div className="z-10 flex items-center justify-center phone:mb-7 lg:mb-10">
            <div
            className={cn(
               "group rounded-full border text-base transition-all ease-in hover:cursor-pointer border-white/5 bg-neutral-900 hover:bg-neutral-800",
            )}
            >
            <TextShimmer className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
               <span className='gradient-text tracking-tight font-medium phone:text-sm tablet:text-base'>✨ Exclusive Featureset</span>
               <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 text-amber-800" />
            </TextShimmer>
            </div>
         </div>
         <video
            autoPlay
            loop
            className="object-cover w-full h-[90vh] -z-10 blur-xl absolute opacity-60"
         >
            <source src="/videos/features.mp4" />
         </video>
      </div>
      <BentoGrid>
         {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
         ))}
      </BentoGrid>
   </div>

  );
}
