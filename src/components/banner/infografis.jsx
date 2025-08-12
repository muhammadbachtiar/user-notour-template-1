import SliderInfografis from "../../atoms/slider";

const InfografisBanner = () => {
  return (
    <div className="col-span-4 min-h-[24rem] bg-[#226597] bg-opacity-90 lg:rounded-e-md lg:col-span-1 flex justify-center items-center">
        <section className="relative w-full flex justify-center items-center">
          <div className="max-w-full w-full grid grid-cols-9 gap-2 dark:bg-gray-700 dark:border-gray-600">
            <div className="col-span-9 max-w-full w-full justify-center overflow-hidden dark:bg-gray-800 dark:border-gray-700">
              <SliderInfografis useButton={false} useDots={false} />
            </div>
          </div>
        </section>
      </div>
  );
};

export default InfografisBanner;
