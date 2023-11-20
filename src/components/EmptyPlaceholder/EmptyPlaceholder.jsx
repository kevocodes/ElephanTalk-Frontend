import { Icon } from "@iconify/react";

function EmptyPlaceholder() {
  return (
    <section className="bg-blue-500 flex flex-col justify-center items-center">
      <div className="border-2 rounded-full w-[100px] h-[100px] flex justify-center items-center">

        <Icon 
        icon="solar:camera-bold" 
        fontSize={50}
        />
      </div>

      <h2 className="pt-6 text-xl">No post yet</h2>
    </section>
  )
}

export default EmptyPlaceholder