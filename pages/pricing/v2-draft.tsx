import { NextPage } from "next";
import { PrimaryButton } from "../../components/common/Buttons/PrimaryButton";
import { FooterCallToAction } from "../../components/common/CallToAction/FooterCallToAction";
import Footer from "../../components/common/Footer/Footer";
import Navbar from "../../components/common/Navbar/Navbar";
import { Typography } from "../../components/common/Typography/Typography";
import homeStyles from "../../components/Home/Home.module.scss";

import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import classNames from "classnames";


const PricingPage: NextPage = () => {
	return <div >
		<Navbar />
		<div className="flex flex-col w-full px-10 mx-auto mt-24">
			<div className="flex flex-col items-center text-center gap-9"> {/* Title, tagline and CTA */}
				<h1 className="max-w-3xl">Get the <span className="text-highlight-yellow">visibility</span> you need today.</h1>
				<Typography type="copyHeader" onDark>Fair and transparent pricing that scales with any organization.</Typography>
				<div className="flex gap-3">
					<PrimaryButton href="#">Get started</PrimaryButton>
					<PrimaryButton href="#" className={homeStyles.hollowButton}>Chat with us</PrimaryButton>
				</div>
			</div>
			<div className="flex max-w-full mx-auto mt-16 gap-11"> {/* Pricing */}
				<div className="flex flex-col flex-shrink-0 w-48 gap-11">
					<PricingRadioFilter title="Billing Period" options={["Monthly", "Annual"]} />
					<PricingRadioFilter title="Retention" options={["3 Months", "6 Months", "12 Months", "2 years"]} />
				</div>
				<div className="flex flex-col">
					<div className="flex justify-between w-[1100px]">
						<PriceItem title="Free" pricePerMonth="0" >
							<span>500 monthly sessions</span>
							<span>1000 monthly errors</span>
							<span>Unlimited seats</span>
						</PriceItem>
						<PriceItem title="Basic" pricePerMonth="50" >
							<span>500 monthly sessions</span>
							<span>1000 monthly errors</span>
							<span>Unlimited seats</span>
						</PriceItem>
						<PriceItem title="Essentials" pricePerMonth="150" >
							<span>500 monthly sessions</span>
							<span>Unlimited seats</span>
						</PriceItem>
						<PriceItem title="Startup" pricePerMonth="400" >
							<span>500 monthly sessions</span>
							<span>1000 monthly errors</span>
							<span>Placeholder item</span>
							<span>Unlimited seats</span>
						</PriceItem>
					</div>
					<Typography type="copy1" onDark className="text-center my-9">If usage goes beyond the included monthly quota, your <a href="#">usage rate</a> kicks in.</Typography>
				</div>
				<div className="flex-shrink w-48" />
			</div>
			<div className="flex flex-col items-center mt-32 text-center gap-9"> {/* Pay as you go */}
				<h2>Pay <span className="text-highlight-yellow">as you go.</span></h2>
				<Typography type="copy1" onDark className="max-w-4xl">Each of our plans comes with a pre-defined usage quota, and if you exceed that quota, we charge an additional fee. For custom plans, <a href="#">reach out to us</a>.</Typography>
			</div>
			<div className="flex gap-10 mx-auto mt-12"> {/* Price calculator */}
				<div className="flex flex-col w-48 gap-11">
					<PricingRadioFilter title="Billing Period" options={["Monthly", "Annual"]} />
					<PricingRadioFilter title="Pricing Tier" options={["Free", "Basic", "Essentials", "Startup"]} />
					<PricingRadioFilter title="Retention" options={["3 Months", "6 Months", "12 Months", "2 years"]} />
				</div>
				<div className="w-[1100px] flex flex-col items-end">
					<div className="flex flex-col border divide-y rounded-lg rounded-br-none divide-divider-on-dark border-divider-on-dark">
						<div className="flex h-12">
							<div className="flex items-center flex-1 border-r border-divider-on-dark px-7"><Typography type="copy2" emphasis>Product</Typography></div>
							<div className="flex items-center justify-center w-[343px] px-7"><Typography type="copy2" emphasis>Cost breakdown</Typography></div>
						</div>
						<CalculatorRowDesktop title="Error Monitoring Usage." description="Error monitoring usage is defined by the number of errors collected by Highlight per month. Our frontend/server SDKs send errors, but you can also send custom errors." />
						<CalculatorRowDesktop title="Session Replay Usage." description="Session replay usage is defined by the number of sessions collected per month. A session is defined by an instance of a user’s tab on your application. " />
						<CalculatorRowDesktop title="Logging Usage." description="Log usage is defined by the number of logs collected by highlight.io per month. A log is defined by a text field with attributes." />
					</div>
					<div className="border border-t-0 rounded-b-lg h-52 border-divider-on-dark">
						<CalculatorCostDisplay heading="Total" cost={1555} />
					</div>
				</div>
				<div className="flex-shrink w-48" />
			</div>
		</div>
		{/* Customers grid */}
		{/* Customers review carousel */}
		<FooterCallToAction />
		<Footer />
	</div>
}

const CalculatorRowDesktop = ({ title, description }: { title: string, description: string }) => {
	const costPlaceholder = 150

	return <div className="flex flex-row">
		<div className="flex flex-col py-5 px-7">
			<Typography type="copy1" emphasis>{title}</Typography>
			<Typography type="copy3" className="mt-2.5">{description}</Typography>
			<input className="mt-4" type="range" />
		</div>
		<div className="border-l border-divider-on-dark">
			<CalculatorCostDisplay heading="Base + Usage" cost={costPlaceholder} />
		</div>
	</div>
}

const CalculatorCostDisplay = ({ cost, heading }: { cost: number, heading: string }) =>
	<div className="grid flex-shrink-0 place-content-center place-items-center w-[343px] h-full">
		<Typography type="copy3" emphasis onDark>{heading}</Typography>
		<span className="text-4xl font-semibold">
			+ ${cost.toFixed(2)}
		</span>
	</div>



const PricingRadioFilter = <T extends string>({ title, options, activeOption }: { title: string, options: readonly T[], activeOption?: T }) => {
	const [active, setActive] = useState<T | undefined>(activeOption)

	return <RadioGroup value={active} onChange={setActive} className="border rounded-lg border-divider-on-dark">
		<RadioGroup.Label className="block px-3 py-1 text-center border-b border-divider-on-dark">
			<Typography type="copy4" emphasis>{title}</Typography>
		</RadioGroup.Label>
		<div className="divide-y divide-divider-on-dark">
			{options.map((option) =>
				<RadioGroup.Option value={option} key={option}>
					{({ checked }) => <div className="flex items-center h-10 px-3 gap-2.5 cursor-pointer group">
						<div className={classNames("border-2 rounded-full border-divider-on-dark group-hover:border-darker-copy-on-dark w-4 h-4 transition-colors", checked && "bg-copy-on-dark")} />
						<Typography type="copy3" className={classNames("group-hover:text-copy-on-dark transition-colors", checked ? "text-copy-on-dark" : "text-darker-copy-on-dark")} emphasis>{option}</Typography>
					</div>}
				</RadioGroup.Option>
			)}
		</div>
	</RadioGroup>
}

const PriceItem = ({ title, pricePerMonth, children }: { title: string, pricePerMonth: string, children: React.ReactNode[] }) => {
	return <div className="flex flex-col w-64 border rounded-md border-divider-on-dark">
		<div className="p-5 border-b border-divider-on-dark">
			<Typography type="copy1" emphasis>{title}</Typography>
			<div className="flex items-end mt-2">
				<Typography type="copy3" emphasis className="self-start align-super">$</Typography>
				<span className="mx-1 text-5xl font-semibold">{pricePerMonth}</span>
				<Typography type="copy3">/ mo</Typography>
			</div>
		</div>
		<div className="p-5 flex flex-col gap-2.5 flex-grow">
			<div>
				<Typography type="copy3" emphasis>Included 🛈</Typography> {/* placeholder icon */}
			</div>
			{children}
		</div>
		<div className="p-5">
			<PrimaryButton href="#" className={homeStyles.hollowButton}>Start free trial</PrimaryButton>
		</div>
	</div>
}

export default PricingPage