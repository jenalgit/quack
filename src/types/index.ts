import {
  NodeType,
  VECTOR,
  RECTANGLE,
  TEXT,
  ELLIPSE,
  Rectangle,
  FRAME
} from "figma-api";

export interface IFigmaMetadata {
  id: string;
  title?: string;
  root?: string;
}

export interface IGenericFigmaNode {
  children?: [IGenericFigmaNode];
  id: nodeId;
  type: NodeType;
  absoluteBoundingBox: Rectangle;
}

export interface ICoordinate {
  x: number;
  y: number;
}

export interface IFrame extends FRAME {}

export interface IVector extends IGenericFigmaNode, VECTOR {
  /*
  Helpful properties of a vector include:
    - absoluteBoundingBox
    - size
  */
}

export interface IRectangle extends IVector, RECTANGLE {
  /*
  Literally the same stuff as vector but also has:
    - cornerRadius
  */
}

export interface IEllipse extends IVector, ELLIPSE {}

export interface IText extends IVector, TEXT {
  /*
  Helpful properties of a text item include:
    - absoluteBoundingBox
    - characters (what the text says)
    - style.fontFamily
    - style.fontSize
    - style.fontWeight
    - style.letterSpacing
  */
}

export type nodeId = string;

export interface IImageType extends IRectangleType {
  nodeId: nodeId;
  fills: [IFillObject];
  name: string;
}
