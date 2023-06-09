//styles
import "./InvoicesList.scss";
//components
import Navigation from "../Navigation/Navigation";
import NoInvoicesPage from "../NoInvoicesPage/NoInvoicesPage";
import InvoicesItem from "../InvoicesItem/InvoicesItem";
//hooks
import { useContext, useEffect } from "react";
//context
import invoiceContext from "../../context/invoice/invoiceContext";

import { useQueryAllInvoiceItems, useQueryAllInvoicesData } from "../../firebase/service";

const InvoicesList = () => {
	const { invoices, filters, setCurrentInvoiceNumber, setPreviewInvoice, setVisibleInvoices } = useContext(invoiceContext);

	useQueryAllInvoicesData();
	useQueryAllInvoiceItems();

	const items = () => {
		if (invoices.length === 0) {
			return <NoInvoicesPage />;
		} else {
			let visibleList = [];
			invoices.forEach((invoice) => {
				visibleList.push(invoice);
			});
			const listItems = visibleList.map((invoice) => {
				const { invoiceId, id, paymentDue, clientName, status, total } = invoice;
				return <InvoicesItem key={id} id={id} number={invoiceId} dateDue={paymentDue} name={clientName} status={status} total={total} />;
			});
			return listItems;
		}
	};

	const getCurrentInvoiceNumber = (e) => {
		const target = e.target.closest(".invoicesList__item");
		if (target === null) {
			return;
		} else {
			const currentInvoiceNumber = target.getAttribute("data-number");
			setCurrentInvoiceNumber(currentInvoiceNumber);
		}
		setPreviewInvoice(true);
	};

	return (
		<section className="invoicesList">
			<Navigation />
			{filters.length > 0 ? (
				<div className="container">
					{
						<ul onClick={(e) => getCurrentInvoiceNumber(e)} className="invoicesList__list">
							{items()}
						</ul>
					}
				</div>
			) : (
				<NoInvoicesPage />
			)}
		</section>
	);
};

export default InvoicesList;
