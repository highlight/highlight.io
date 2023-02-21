import { NextPage } from "next";
import { PrimaryButton } from "../../components/common/Buttons/PrimaryButton";
import { FooterCallToAction } from "../../components/common/CallToAction/FooterCallToAction";
import Footer from "../../components/common/Footer/Footer";
import Navbar from "../../components/common/Navbar/Navbar";
import { Typography } from "../../components/common/Typography/Typography";
import homeStyles from "../../components/Home/Home.module.scss";
import { InformationCircleIcon } from "@heroicons/react/20/solid"

import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import classNames from "classnames";


const PricingPage: NextPage = () => {
	return <div>
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
			<PlanTable />
			<div className="flex flex-col items-center mt-32 text-center gap-9"> {/* Pay as you go */}
				<h2>Pay <span className="text-highlight-yellow">as you go.</span></h2>
				<Typography type="copy1" onDark className="max-w-4xl">Each of our plans comes with a pre-defined usage quota, and if you exceed that quota, we charge an additional fee. For custom plans, <a href="#">reach out to us</a>.</Typography>
			</div>
			<PriceCalculator />
		</div>
		{/* Customers grid */}
		{/* Customers review carousel */}
		<FooterCallToAction />
		<Footer />
	</div>
}

const billingPeriodOptions = ["Monthly", "Annual"] as const
type BillingPeriod = typeof billingPeriodOptions[number]

const retentionOptions = ["3 months", "6 months", "12 months", "2 years",] as const
type Retention = typeof retentionOptions[number]
const retentionMultipliers: Record<Retention, number> = {
	"3 months": 1,
	"6 months": 1.5,
	"12 months": 2,
	"2 years": 2.5
} as const

const tierNames = ["Free", "Basic", "Essentials", "Startup"] as const
type TierName = typeof tierNames[number]

type PricingTier = {
	basePrice: number,
	sessions: number,
	errors: number
}

const priceTiers: Record<TierName, PricingTier> = {
	"Free": { basePrice: 0, sessions: 500, errors: 1000 },
	"Basic": { basePrice: 50, sessions: 2000, errors: 4000 },
	"Essentials": { basePrice: 150, sessions: 10000, errors: 20000 },
	"Startup": { basePrice: 400, sessions: 80000, errors: 160000 },
}

function getBasePrice({ basePrice }: PricingTier, billing: BillingPeriod, retention: Retention) {
	const billingMultiplier = billing === "Annual" ? 0.8 : 1
	const retentionMultiplier = retentionMultipliers[retention]

	return basePrice * billingMultiplier * retentionMultiplier
}

const PlanTable = () => {
	const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("Monthly")
	const [retentionPeriod, setRetentionPeriod] = useState<Retention>("3 months")

	return <div className="flex max-w-full mx-auto mt-16 gap-11"> {/* Pricing */}
		<div className="flex flex-col flex-shrink-0 w-48 gap-11">
			<PricingRadioFilter title="Billing Period" options={billingPeriodOptions} value={billingPeriod} onChange={setBillingPeriod} />
			<PricingRadioFilter title="Retention" options={retentionOptions} value={retentionPeriod} onChange={setRetentionPeriod} />
		</div>
		<div className="flex flex-col">
			<div className="flex justify-between w-[1100px]">
				{Object.entries(priceTiers).map(([name, tier]) =>
					<PriceItem name={name} tier={tier} billingPeriod={billingPeriod} key={name} retention={retentionPeriod} />
				)}
			</div>
			<Typography type="copy1" onDark className="text-center my-9">If usage goes beyond the included monthly quota, your <a href="#">usage rate</a> kicks in.</Typography>
		</div>
		<div className="flex-shrink w-48" />
	</div>
}

const PriceCalculator = () => {
	const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(billingPeriodOptions[0])
	const [pricingTier, setPricingTier] = useState<TierName>("Basic")

	return <div className="flex gap-10 mx-auto mt-12"> {/* Price calculator */}
		<div className="flex flex-col w-48 gap-11">
			<PricingRadioFilter title="Billing Period" options={billingPeriodOptions} value={billingPeriod} onChange={setBillingPeriod} />
			<PricingRadioFilter title="Pricing Tier" options={["Free", "Basic", "Essentials", "Startup"]} />
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

const PricingRadioFilter = <T extends string>({ title, options, value, onChange }: { title: string, options: readonly T[], value?: T, onChange?: (value: T) => void }) => {
	return <RadioGroup value={value} onChange={onChange} className="border rounded-lg border-divider-on-dark">
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

const PriceItem = ({ name, tier, billingPeriod, retention }: { name: string, tier: PricingTier, billingPeriod: BillingPeriod, retention: Retention }) => {
	const { basePrice, sessions, errors } = tier

	return <div className="flex flex-col w-64 border rounded-md border-divider-on-dark">
		<div className="p-5 border-b border-divider-on-dark">
			<Typography type="copy1" emphasis>{name}</Typography>
			<div className="flex items-end mt-2">
				<Typography type="copy3" emphasis className="self-start align-super">$</Typography>
				<span className="mx-1 text-5xl font-semibold">{getBasePrice(tier, billingPeriod, retention)}</span>
				<Typography type="copy3">/ mo</Typography>
			</div>
		</div>
		<div className="p-5 flex flex-col gap-2.5 flex-grow">
			<div className="flex items-center gap-1">
				<Typography type="copy3" emphasis>Included</Typography> <InformationCircleIcon className="inline w-5 h-5" />
			</div>
			<Typography type="copy3">{sessions} monthly sessions</Typography>
			<Typography type="copy3">{errors} monthly errors</Typography>
			<Typography type="copy3">Unlimited seats</Typography>
		</div>
		<div className="p-5">
			<PrimaryButton href="#" className={homeStyles.hollowButton}>Start free trial</PrimaryButton>
		</div>
	</div>
}

export default PricingPage