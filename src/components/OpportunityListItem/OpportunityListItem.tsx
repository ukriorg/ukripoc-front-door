import React, { FC, HTMLAttributes } from "react";
import { H4 } from "@govuk-react/heading";
import P from "@govuk-react/paragraph";
import Label from "@govuk-react/label-text";
import GridRow from "@govuk-react/grid-row";
import GridCol from "@govuk-react/grid-col";
import SectionBreak from "@govuk-react/section-break";
import { Opportunity } from "../OpportunityIndex/OpportunityIndex";
import Link from "@govuk-react/link";
import { Link as RouterLink } from "@reach/router";

interface Props extends HTMLAttributes<HTMLElement> {
    opportunity?: Opportunity;
}

export const OpportunityListItem: FC<Props> = ({ opportunity: opp }) => {
    if (!opp) {
        return null;
    }
    const funders = opp.funders || [];

    let openDate: Date | undefined;
    if (opp.openDate) {
        openDate = new Date(opp.openDate);
    }

    let closeDate: Date | undefined;
    if (opp.closeDate) {
        closeDate = new Date(opp.closeDate);
    }

    return (
        <section key={opp.id}>
            <H4>
                <Link as={RouterLink} to={`opportunity/${opp.id}`}>
                    {opp.name}
                </Link>
            </H4>
            <P>{opp.description}</P>
            {!!funders.length && (
                <GridRow mb={closeDate ? 0 : 4}>
                    <GridCol setWidth="30%">
                        <Label>
                            {funders.length === 1 ? "Funder" : "Funders"}:
                        </Label>
                    </GridCol>
                    <GridCol>
                        <Label>{funders.join(", ")}</Label>
                    </GridCol>
                </GridRow>
            )}
            {openDate && (
                <GridRow>
                    <GridCol setWidth="30%">
                        <Label>Opens:</Label>
                    </GridCol>
                    <GridCol>
                        <Label>{openDate.toLocaleDateString()}</Label>
                    </GridCol>
                </GridRow>
            )}
            {closeDate && (
                <GridRow mb={4}>
                    <GridCol setWidth="30%">
                        <Label>Closes:</Label>
                    </GridCol>
                    <GridCol>
                        <Label>{closeDate.toLocaleDateString()}</Label>
                    </GridCol>
                </GridRow>
            )}
            <SectionBreak visible mb={4} />
        </section>
    );
};

export default OpportunityListItem;
