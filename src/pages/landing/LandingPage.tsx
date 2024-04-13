import ContentCard from "../../components/landing/ContentCard";
import MainLayout from "../../layouts/MainLayout";
import { TbWorld } from "react-icons/tb";
import { LuWrench } from "react-icons/lu";
import { SlMap } from "react-icons/sl";
import LandingFormSection from "./LandingFormSection";
import Navbar from "../../components/Navbar/Navbar";

const LandingPage = () => {
  return (
    <MainLayout>
      <Navbar />
      <div className="bg-[url('/hero-image-layer.png')] bg-cover h-[800px] relative text-white flex items-center">
        <img
          src="/hero-image.png"
          className="h-[800px] w-full z-[-99] object-cover"
        />
        <div className="ml-40 absolute">
          <h1 className="font-semibold text-6xl leading-[88px]">NepGIS</h1>
          <p className="font-light text-2xl leading-[33px]">
            Unearthing opportunities, pinpointing prosperity.
          </p>
        </div>
      </div>
      <div
        className="h-[300px] flex gap-10 justify-center items-center"
        id="Overview"
      >
        <ContentCard icon={TbWorld} title="Expore">
          Bether understand a location by gathering Information about its key
          features and how they interact. Visualize data through map PyITPois,
          themes and iabeis, You con even overiay muitipie dorasets on a singie
          mep redistingvisn partems that would nototherwise be visible
        </ContentCard>{" "}
        <ContentCard icon={SlMap} title="Model">
          Integrate your corporate data with moos and demegrephics. Combine
          thisInformation with our powerul spanigSvereng ans modeing roois. Run
          differentscenanen ter en sccurete. sp-to-dorerepresentation of a
          locations possichines
        </ContentCard>{" "}
        <ContentCard icon={LuWrench} title="Act">
          Build models that ane easty understood oy nom technologists. Enabie
          corporcie secsion maker to fully understand me arnbutes and drawbacks
          cregch she. in poch scanano. neip them toke the type of action thar
          propeis business
        </ContentCard>
      </div>
      <div className="h-[900px] bg-primary-gray-100 flex justify-around items-center">
        <div>
          <p className="text-primary-blue-200 text-xl font-bold leading-3xl uppercase mb-4">
            Contact us
          </p>
          <p className="text-primary-blue-400 text-5xl font-semibold leading-[54px] mb-5">
            Let&apos;s Talk About <br />
            Your Information
          </p>
          <p className="text-primary-blue-400 text-xl font-medium leading-3xl">
            Call us for immediate support to this number
            <br />
            +977-014883232
          </p>
        </div>
        <LandingFormSection />
      </div>
    </MainLayout>
  );
};

export default LandingPage;
