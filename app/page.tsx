import Hero from "@/components/sections/Hero";
import Welcome from "@/components/sections/Welcome";
import Prizes from "@/components/sections/Prizes";
import HowItWorks from "@/components/sections/HowItWorks";
import WhatToPost from "@/components/sections/WhatToPost";
import ContentIdeas from "@/components/sections/ContentIdeas";
import Voice from "@/components/sections/Voice";
import BestPractices from "@/components/sections/BestPractices";
import HowToShoot from "@/components/sections/HowToShoot";
import Scoring from "@/components/sections/Scoring";
import GroundRules from "@/components/sections/GroundRules";
import FairPlay from "@/components/sections/FairPlay";
import FAQ from "@/components/sections/FAQ";
import Closing from "@/components/sections/Closing";

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <Prizes />
      <HowItWorks />
      <WhatToPost />
      <ContentIdeas />
      <Voice />
      <BestPractices />
      <HowToShoot />
      <Scoring />
      <GroundRules />
      <FairPlay />
      <FAQ />
      <Closing />
    </>
  );
}
