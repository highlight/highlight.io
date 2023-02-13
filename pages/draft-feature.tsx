import classNames from "classnames";
import { NextPage } from "next";
import { PrimaryButton } from "../components/common/Buttons/PrimaryButton";
import { FooterCallToAction } from "../components/common/CallToAction/FooterCallToAction";
import { OSSCallToAction } from "../components/common/CallToAction/OSSCallToAction";
import Footer from "../components/common/Footer/Footer";
import Navbar from "../components/common/Navbar/Navbar";
import { Section } from "../components/common/Section/Section";
import { Typography } from "../components/common/Typography/Typography";
import { BigHeroArt } from "../components/Home/BigHeroArt";
import { CompaniesReel } from "../components/Home/CompaniesReel/CompaniesReel";
import { CustomerReviewTrack } from "../components/Home/CustomerReviewTrack";
import homeStyles from "../components/Home/Home.module.scss"

const ShowcasePage: NextPage = () => {
	return <div>
		<Navbar />
		<main>
			<div className="h-[762px] relative overflow-hidden pt-28 box-content">
				<div className="h-[613px] aspect-video border border-red-500 rounded rotate-6 left-[65%] absolute top-24" />
				<div className="absolute w-full px-10 mx-auto mt-10 lg:px-24">
					<div className="flex flex-col max-w-4xl gap-8">
						<h1 className="text-white">Session Replay & UX Monitoring</h1>
						<Typography type="copyHeader" className="text-copy-on-dark">A cohesive toolset for monitoring and maintaining your full-stack web application.</Typography>
						<div className="flex flex-row gap-6">
							<PrimaryButton href="#">
								Get started for free
							</PrimaryButton>
							<PrimaryButton href="#" className={homeStyles.hollowButton}>
								Read the docs
							</PrimaryButton>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full mx-auto max-w-screen-2xl">
				<Section className="flex flex-col gap-20">
					<h2 className="self-center max-w-[809px] text-center">Understand your users & why they’re falling through the cracks.</h2>
					<div className="flex flex-col gap-56">
						<FeaturePoint title="Cohesion across your stack." description="Get an organic link between our products to understand the what, why and how of your application." />
						<FeaturePoint reverse title="Cohesion across your stack." description="Get an organic link between our products to understand the what, why and how of your application." />
						<FeaturePoint title="Cohesion across your stack." description="Get an organic link between our products to understand the what, why and how of your application." />
						<FeaturePoint reverse title="Cohesion across your stack." description="Get an organic link between our products to understand the what, why and how of your application." />
					</div>
				</Section>

			</div>
			<BigHeroArt />
			<OSSCallToAction />
			<CompaniesReel />
			<CustomerReviewTrack />
			<FooterCallToAction />
		</main>
		<Footer />
	</div>
}

const FeaturePoint = ({ title, description, imageUrl, reverse }: { title: string, description: string, imageUrl?: string, reverse?: boolean }) => {
	return <div className={classNames("flex flex-col  lg:gap-16 lg:items-center", reverse ? "lg:flex-row-reverse" : "lg:flex-row")}>
		<div className="flex flex-col gap-5 lg:flex-shrink">
			<h3>{title}</h3>
			<Typography type="copyHeader" className="text-copy-on-dark">{description}</Typography>
			<PrimaryButton href="#" className="self-start mt-6">
				Get started for free
			</PrimaryButton>
		</div>
		<div className="bg-[#30294E] overflow-hidden rounded-2xl aspect-video h-72 shrink-0 grow-0"></div>
	</div>
}

export default ShowcasePage


