import classNames from "classnames";
import { NextPage } from "next";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PrimaryButton } from "../../components/common/Buttons/PrimaryButton";
import { FooterCallToAction } from "../../components/common/CallToAction/FooterCallToAction";
import { OSSCallToAction } from "../../components/common/CallToAction/OSSCallToAction";
import Footer from "../../components/common/Footer/Footer";
import Navbar from "../../components/common/Navbar/Navbar";
import { Section } from "../../components/common/Section/Section";
import { Typography } from "../../components/common/Typography/Typography";
import { BigHeroArt } from "../../components/Home/BigHeroArt";
import { CompaniesReel } from "../../components/Home/CompaniesReel/CompaniesReel";
import { CustomerReviewTrack } from "../../components/Home/CustomerReviewTrack";
import homeStyles from "../../components/Home/Home.module.scss"
import productStyles from "../../components/Products/Products.module.scss"
import InfoRow from "../../components/Products/InfoRow";
import ProductsReplay from '../../public/images/products-replay.png';
import { PRODUCTS } from "../../components/Products/products";
import { AnimateCarouselImage } from "../../components/Animate";
import { MdKeyboardReturn } from "react-icons/md";
import sessionReplay from '../../public/images/session-replay.png'

const product = PRODUCTS[0];

const ShowcasePage: NextPage = () => {
	const [imageLoaded, setImageLoaded] = useState(false);

	return <div>
		<Navbar />
		<div className="hidden md:flex ml-10 my-2">
			<Link href="/">
				<Typography type="copy3" emphasis={true}>
					<div className="flex items-center justify-start gap-2">
						<MdKeyboardReturn className="h-5" /> Back Home
					</div>
				</Typography>
			</Link>
		</div>
		<main>
			<div className="flex flex-col md:flex-row justify-between w-screen overflow-hidden px-8 md:py-28">
				<div className="md:w-1/2 flex justify-center mt-10">
					<div className="flex flex-col max-w-4xl gap-8 text-center md:text-left">
						<h1 className="text-white">Session Replay & UX Monitoring</h1>
						<Typography type="copy1" className="text-copy-on-dark">A cohesive toolset for monitoring and maintaining your full-stack web application.</Typography>
						<div className="flex flex-col md:flex-row justify-start gap-4 w-full md:w-auto">
							<PrimaryButton
								className={classNames(homeStyles.solidButton, 'min-w-[180px]')}
								href="https://app.highlight.io/?sign_up=1"
							>
								<Typography type="copy2" emphasis={true}>
									Get started
								</Typography>
							</PrimaryButton>
							<PrimaryButton
								href={'/docs'}
								className={classNames(homeStyles.hollowButton)}
							>
								<Typography type="copy2" emphasis={true}>
									Read our docs
								</Typography>
							</PrimaryButton>
						</div>
					</div>
				</div>
				<div className="flex justify-center mt-12 md:mt-0 md:absolute right-0 overflow-y-hidden">
					<Image
						className={`right-0 object-contain bottom-0 sm:w-[280px] md:w-[300px] lg:w-[450px] xl:w-[450px]`}
						src={sessionReplay}
						alt="Feature Spotlight"
						onLoadingComplete={() => setImageLoaded(true)}
					/>
				</div>
			</div>
			<div className="w-full mx-auto max-w-screen-2xl mt-24">
				<Section className="flex flex-col gap-20">
					<h2 className="self-center max-w-[809px] text-center">Understand your users & why they’re falling through the cracks.</h2>
					{/* <div className="flex flex-col gap-56">
						<FeaturePoint title="Cohesion across your stack." description="Get an organic link between our products to understand the what, why and how of your application." />
						<FeaturePoint reverse title="Cohesion across your stack." description="Get an organic link between our products to understand the what, why and how of your application." />
						<FeaturePoint title="Cohesion across your stack." description="Get an organic link between our products to understand the what, why and how of your application." />
						<FeaturePoint reverse title="Cohesion across your stack." description="Get an organic link between our products to understand the what, why and how of your application." />
					</div> */}
					<div className={productStyles.infoContainer}>
						<InfoRow
							title={"Cohesion across your stack."}
							desc={"Get an organic link between our products to understand the what, why and how of your application."}
							link={"https://app.highlight.io/?sign_up=1"}
							linkText={"Get started for free"}
							imgSrc={ProductsReplay}
							invert
						/>

						<div className={productStyles.divider} />

						<InfoRow
							title={"Cohesion across your stack."}
							desc={"Get an organic link between our products to understand the what, why and how of your application."}
							link={"https://app.highlight.io/?sign_up=1"}
							linkText={"Get started for free"}
							imgSrc={ProductsReplay}
						/>

						<div className={productStyles.divider} />

						<InfoRow
							title={"Cohesion across your stack."}
							desc={"Get an organic link between our products to understand the what, why and how of your application."}
							link={"https://app.highlight.io/?sign_up=1"}
							linkText={"Get started for free"}
							imgSrc={ProductsReplay}
							invert
						/>

					</div>
				</Section>

			</div>
			<BigHeroArt />
			<OSSCallToAction />
			<Section>
				<CompaniesReel />
			</Section>
			<Section>
				<div className={homeStyles.anchorFeature}>
					<div className={homeStyles.anchorHead}>
						<Typography type="copy2" onDark>
							Don&apos;t take our word.{' '}
							<Link href="/customers">
								Read our customer review section →
							</Link>
						</Typography>
					</div>
				</div>
			</Section>
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


