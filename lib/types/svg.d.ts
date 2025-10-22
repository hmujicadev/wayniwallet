import type { FC, SVGProps } from "react";
export type SvgComponent = FC<SVGProps<SVGSVGElement> & { title?: string }>;
export {};

declare module "*.svg" {
  const Component: SvgComponent;
  export default Component;
}

declare module "*.svg?url" {
  const url: string;
  export default url;
}