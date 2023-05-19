import sass from "./Container.module.scss";
import { FC, ReactNode } from "react";

interface ContainerProps {
	children: ReactNode
}

export const Container: FC<ContainerProps> = ({ children }) => (
	<div className={sass.container}>{children}</div>
)
