import React, { useContext } from "react";
import PropTypes, { InferProps } from "prop-types";
import PageContext from "./context";

const PageProps = {
  children: PropTypes.node.isRequired,
  page: PropTypes.string.isRequired
};

const Page = ({ children, page }: InferProps<typeof PageProps>) => {
  const pages = useContext(PageContext);
  if (page !== pages.page) return null;
  return <>{children}</>;
};

Page.propTypes = PageProps;

export default Page;
