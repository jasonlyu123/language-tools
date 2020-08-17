import { Node } from 'estree-walker';
import { Identifier, BaseNode, ArrayPattern, ObjectPattern } from '../interfaces';

export function isMember(parent: Node, prop: string) {
    return parent.type == 'MemberExpression' && prop == 'property';
}

export function isObjectKey(parent: Node, prop: string) {
    return parent.type == 'Property' && prop == 'key';
}

export function isText(node: Node) {
    return node.type === 'Text';
}

export function attributeValueIsString(attr: Node) {
    return attr.value.length !== 1 || attr.value[0]?.type === 'Text';
}

export function isDestructuringPatterns(node: BaseNode): node is ArrayPattern | ObjectPattern {
    return node.type === 'ArrayPattern' || node.type === 'ObjectPattern';
}

export function isIdentifier(node: any): node is Identifier {
    return node.type === 'Identifier';
}