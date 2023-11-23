import { Icon } from "@iconify/react";

function EmptyPlaceholder({ icon, text }) {
  return (
    <section className="flex-1 justify-self-center flex flex-col justify-center items-center">
      <div className="border-2 border-foreground rounded-full w-[100px] h-[100px] flex justify-center items-center">
        <Icon icon={icon} fontSize={50} />
      </div>

      <h2 className="pt-6 text-xl">{text}</h2>
    </section>
  );
}

export default EmptyPlaceholder;
