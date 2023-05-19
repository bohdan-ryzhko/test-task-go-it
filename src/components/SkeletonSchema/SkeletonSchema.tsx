import sass from "./SkeletonSchema.module.scss";
import { FC } from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";

export const SkeletonSchema: FC = () => {
	return (
		<ul className={sass.skeletonList}>
			<li className={sass.skeletonItem}><SkeletonLoader height={504} /></li>
			<li className={sass.skeletonItem}><SkeletonLoader height={504} /></li>
			<li className={sass.skeletonItem}><SkeletonLoader height={504} /></li>
		</ul>
	)
}
