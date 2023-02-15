import { NextPage } from "next";
import { PrimaryButton } from "../../components/common/Buttons/PrimaryButton";
import { FooterCallToAction } from "../../components/common/CallToAction/FooterCallToAction";
import Footer from "../../components/common/Footer/Footer";
import Navbar from "../../components/common/Navbar/Navbar";
import { Typography } from "../../components/common/Typography/Typography";
import homeStyles from "../../components/Home/Home.module.scss"

const PricingPage: NextPage = () => {
	return <div >
		<Navbar />
		<div className="flex flex-col w-full max-w-screen-xl px-10 mx-auto mt-24">
			<div className="flex flex-col items-center text-center gap-9"> {/* Title, tagline and CTA */}
				<h1 className="max-w-3xl">Get the <span className="text-highlight-yellow">visibility</span> you need today.</h1>
				<Typography type="copyHeader" onDark>Fair and transparent pricing that scales with any organization.</Typography>
				<div className="flex gap-3">
					<PrimaryButton href="#">Get started</PrimaryButton>
					<PrimaryButton href="#" className={homeStyles.hollowButton}>Chat with us</PrimaryButton>
				</div>
			</div>
			<div className="flex flex-col items-center mt-16"> {/* Pricing */}
				<div className="flex gap-11">
					<div className="flex flex-col w-48 gap-11">
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
					{/* <div className="flex-shrink w-48"/> */}
				</div>
			</div>
			<div className="flex flex-col items-center mt-32 text-center gap-9"> {/* Pay as you go */}
				<h2>Pay <span className="text-highlight-yellow">as you go.</span></h2>
				<Typography type="copy1" onDark className="max-w-4xl">Each of our plans comes with a pre-defined usage quota, and if you exceed that quota, we charge an additional fee. For custom plans, <a href="#">reach out to us</a>.</Typography>
			</div>
			<div className="flex gap-10"> {/* Price calculator */}
				<div className="flex flex-col w-48 gap-11">
					<PricingRadioFilter title="Billing Period" options={["Monthly", "Annual"]} />
					<PricingRadioFilter title="Pricing Tier" options={["Free", "Basic", "Essentials", "Startup"]} />
					<PricingRadioFilter title="Retention" options={["3 Months", "6 Months", "12 Months", "2 years"]} />
				</div>
			</div>
		</div>
		{/* Customers grid */}
		{/* Customers review carousel */}
		<FooterCallToAction />
		<Footer />
	</div>
}

const PricingRadioFilter = ({ title, options }: { title: string, options: string[], activeOptionIndex?: number }) => {


	return <div className="border rounded-lg border-divider-on-dark">
		<div className="px-3 py-1 border-b border-divider-on-dark">
			<Typography type="copy4" emphasis className="block text-center">{title}</Typography>
		</div>
		<div className="divide-y divide-divider-on-dark">
			{options.map((opt, i) => {
				const optionId = `${title}-${opt}-${Math.random()}`

				return (<label htmlFor={optionId} className="flex items-center h-10 px-3 gap-2.5" key={i} >
					<input type="radio" name={`${title}-${Math.random()}`} value={opt} id={optionId} />
					<Typography type="copy3" emphasis onDark>{opt}</Typography>
				</label>)
			})}
		</div>
	</div>
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