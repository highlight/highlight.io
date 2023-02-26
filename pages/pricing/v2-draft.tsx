import { NextPage } from "next";
import { PrimaryButton } from "../../components/common/Buttons/PrimaryButton";
import { FooterCallToAction } from "../../components/common/CallToAction/FooterCallToAction";
import Footer from "../../components/common/Footer/Footer";
import Navbar from "../../components/common/Navbar/Navbar";
import { Typography } from "../../components/common/Typography/Typography";
import homeStyles from "../../components/Home/Home.module.scss";
import { InformationCircleIcon, ChevronDownIcon, CheckIcon } from "@heroicons/react/20/solid"

import { RadioGroup, Listbox } from "@headlessui/react";
import * as Slider from "@radix-ui/react-slider"
import { useState } from "react";
import classNames from "classnames";


const PricingPage: NextPage = () => {
	return <div>
		<Navbar />
		<div className="flex flex-col w-full px-10 mx-auto mt-24">
			<div className="flex flex-col items-center text-center gap-9"> {/* Title, tagline and CTA */}
				<h1 className="max-w-3xl">Get the <span className="text-highlight-yellow">visibility</span> you need today.</h1>
				<Typography type="copyHeader" onDark>Fair and transparent pricing that scales with any organization.</Typography>
			</div>
			<PlanTable />
			<div className="flex flex-col items-center mt-32 text-center gap-9" id="overage"> {/* Pay as you go */}
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

const retentionOptions = ["3 months", "6 months", "1 year", "2 years",] as const
type Retention = typeof retentionOptions[number]
const retentionMultipliers: Record<Retention, number> = {
	"3 months": 1,
	"6 months": 1.5,
	"1 year": 2,
	"2 years": 2.5
} as const

const tierOptions = ["Free", "Basic", "Essentials", "Startup"] as const
type TierName = typeof tierOptions[number]

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
	const [retention, setRetention] = useState<Retention>("3 months")

	return <div className="flex flex-col items-center max-w-full gap-6 mx-auto mt-16"> {/* Pricing */}
		<div className="flex flex-wrap justify-center gap-12">
			<RadioOptions title="Billing Period" options={billingPeriodOptions} value={billingPeriod} onChange={setBillingPeriod} />
			<RadioOptions title="Retention" options={retentionOptions} value={retention} onChange={setRetention} />
		</div>
		<div className="flex flex-wrap gap-7">
			{Object.entries(priceTiers).map(([name, tier]) =>
				<PriceItem name={name} tier={tier} billingPeriod={billingPeriod} key={name} retention={retention} />
			)}
		</div>
		<Typography type="copy1" onDark className="text-center my-9">If usage goes beyond the included monthly quota, your <a href="#overage">usage rate</a> kicks in.</Typography>
		<div className="flex-shrink w-48" />
	</div>
}

const PriceCalculator = () => {
	const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("Monthly")
	const [tierName, setTierName] = useState<TierName>("Free")
	const [retention, setRetention] = useState<Retention>("3 months")

	const [errorUsage, setErrorUsage] = useState(0)
	const [sessionUsage, setSessionUsage] = useState(0)
	const [loggingUsage, setLoggingUsage] = useState(0)

	const tier = priceTiers[tierName]
	const basePrice = getBasePrice(tier, billingPeriod, retention)

	const getUsagePrice = (useage: number, price: number, size: number) =>
		Math.trunc(Math.max(useage, 0) * price / size * retentionMultipliers[retention] * 100) / 100

	const sessionsCost = getUsagePrice(sessionUsage - tier.sessions, 5.00, 1_000)
	const errorsCost = getUsagePrice(errorUsage - tier.errors, 0.20, 1_000)
	const loggingCost = getUsagePrice(loggingUsage, 1.50, 1_000_000)

	return <div className="flex flex-col items-center w-full gap-10 mx-auto mt-12"> {/* Price calculator */}
		<div className="flex flex-wrap justify-center gap-12 gap-y-3">
			<RadioOptions title="Billing Period" options={billingPeriodOptions} value={billingPeriod} onChange={setBillingPeriod} />
			<RadioOptions title="Pricing Tier" options={tierOptions} value={tierName} onChange={setTierName} />
			<RadioOptions title="Retention" options={retentionOptions} value={retention} onChange={setRetention} />
		</div>
		<div className="w-[1100px] flex flex-col items-end">
			<div className="flex flex-col border divide-y rounded-lg rounded-br-none divide-divider-on-dark border-divider-on-dark">
				<div className="flex h-12">
					<div className="flex items-center flex-1 border-r border-divider-on-dark px-7"><Typography type="copy2" emphasis>Product</Typography></div>
					<div className="flex items-center justify-center w-[343px] px-7"><Typography type="copy2" emphasis>Cost breakdown</Typography></div>
				</div>
				<CalculatorRowDesktop title="Error Monitoring Usage." description="Error monitoring usage is defined by the number of errors collected by Highlight per month. Our frontend/server SDKs send errors, but you can also send custom errors." value={errorUsage} onChange={setErrorUsage} cost={errorsCost + basePrice} />
				<CalculatorRowDesktop title="Session Replay Usage." description="Session replay usage is defined by the number of sessions collected per month. A session is defined by an instance of a user’s tab on your application. " value={sessionUsage} onChange={setSessionUsage} cost={sessionsCost + basePrice} />
				<CalculatorRowDesktop title="Logging Usage." description="Log usage is defined by the number of logs collected by highlight.io per month. A log is defined by a text field with attributes." value={loggingUsage} onChange={setLoggingUsage} cost={loggingCost + basePrice} />
			</div>
			<div className="border border-t-0 rounded-b-lg h-52 border-divider-on-dark">
				<CalculatorCostDisplay heading="Total" cost={basePrice + sessionsCost + errorsCost + loggingCost} />
			</div>
		</div>
		<div className="flex-shrink w-48" />
	</div>
}

const CalculatorRowDesktop = ({ title, description, value, onChange, cost }: { title: string, description: string, value: number, onChange: (value: number) => void, cost: number }) => {
	const rangeOptions = [0, 500, 1_000, 10_000, 100_000, 250_000, 500_000, 750_000, 1_000_000]

	return <div className="flex flex-row">
		<div className="flex flex-col gap-1 py-5 px-7">
			<Typography type="copy1" emphasis>{title}</Typography>
			<Typography type="copy3" className="mt-2.5">{description}</Typography>
			<RangedInput options={rangeOptions} value={value} onChange={onChange} />
		</div>
		<div className="border-l border-divider-on-dark">
			<CalculatorCostDisplay heading="Base + Usage" cost={cost} />
		</div>
	</div>
}

export const RangedInput = ({ options, value, onChange }: { options: number[], value: number, onChange: (value: number) => void }) => {
	const sortedOptions = [...options].sort((a, b) => a - b)
	const min = sortedOptions[0] ?? 0
	const max = sortedOptions[sortedOptions.length - 1] ?? 100

	const snapValue = (value: number) => {
		const deltas = sortedOptions.map(v => Math.abs(v - value))
		for (const [i, delta] of deltas.entries()) {
			if ((deltas[i + 1] ?? Infinity) > delta) return sortedOptions[i]
		}
		return sortedOptions[0]
	}

	return <>
		<div className="block sm:hidden">
			<Listbox value={snapValue(value)} onChange={onChange}>
				<Listbox.Button className="flex items-center justify-center w-full h-12 gap-2 transition-all border rounded-lg border-copy-on-light hover:bg-white/10">
					<Typography type="copy2" emphasis onDark>	{snapValue(value).toLocaleString(undefined, { notation: "compact" })}</Typography>
					<ChevronDownIcon className="w-5 h-5 text-darker-copy-on-dark" />
				</Listbox.Button>
				<Listbox.Options className="p-1 mt-2 border rounded-lg border-copy-on-light">
					{options.map((value, i) => (
						<Listbox.Option key={i} value={value} className="flex items-center justify-between px-2 py-1 transition-all rounded cursor-pointer hover:bg-white/10">
							{({ selected }) => (<>
								<Typography type="copy2" emphasis={selected} onDark={!selected}>
									{value.toLocaleString(undefined, { notation: "compact" })}
								</Typography>
								{selected && <CheckIcon className="w-5 h-5 text-darker-copy-on-dark" />}
							</>)}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</Listbox>
		</div>
		<Slider.Root min={min} max={max} value={[value]} onValueChange={([ev]) => (ev != null) && onChange(ev)} className="relative items-center hidden w-full h-16 mt-4 select-none sm:flex touch-none group">
			<Slider.Track className="relative flex-1 h-3 overflow-hidden rounded-full bg-divider-on-dark" />
			<Slider.Thumb className="relative w-6 h-6 border-2 focus:border-purple-primary hover:shadow-white/25 hover:shadow-[0_0_0_4px] outline-none bg-[#F5F5F5] border-copy-on-dark rounded-full flex flex-col items-center transition-all">
				<div className="absolute w-2.5 h-2.5 rotate-45 rounded-sm -top-4 bg-blue-cta" />
				<div className="absolute px-1 py-0.5 mb-2 text-divider-on-dark font-semibold text-[10px] rounded-sm bottom-full bg-blue-cta">
					{value.toLocaleString(undefined, { notation: "compact" })}
				</div>
			</Slider.Thumb>
		</Slider.Root>
	</>
}

const CalculatorCostDisplay = ({ cost, heading }: { cost: number, heading: string }) => (
	<div className="grid flex-shrink-0 place-content-center place-items-center w-[343px] h-full">
		<Typography type="copy3" emphasis onDark>{heading}</Typography>
		<span className="text-4xl font-semibold">
			{cost.toLocaleString(undefined, { style: "currency", currency: "USD", signDisplay: "always", }).replace("+", "+ ")}
		</span>
	</div>
)

const RadioOptions = <T extends string>({ title, options, value, onChange }: { title: string, options: readonly T[], value?: T, onChange?: (value: T) => void }) => {
	return <RadioGroup value={value} onChange={onChange} className="flex flex-col items-center gap-2">
		<RadioGroup.Label className="">
			<Typography type="copy4" className="text-center text-darker-copy-on-dark">{title}</Typography>
		</RadioGroup.Label>
		<div className="flex p-px border rounded-[10px] gap-1 bg-user-black border-divider-on-dark">
			{options.map((option) =>
				<RadioGroup.Option value={option} key={option}>
					{({ checked }) => <div className="cursor-pointer">
						<div className={classNames("text-center px-2.5 py-1.5 select-none rounded-lg transition-colors", checked ? "text-dark-background bg-white" : "text-white hover:bg-white/10")}>
							<Typography type="copy3" emphasis >{option}</Typography>
						</div>
					</div>}
				</RadioGroup.Option>
			)}
		</div>
	</RadioGroup>
}

const PriceItem = ({ name, tier, billingPeriod, retention }: { name: string, tier: PricingTier, billingPeriod: BillingPeriod, retention: Retention }) => {
	const { sessions, errors } = tier

	return <div className="flex flex-col flex-grow border rounded-md lg:w-64 border-divider-on-dark">
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