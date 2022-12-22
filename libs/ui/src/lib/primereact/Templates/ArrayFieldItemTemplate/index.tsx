import {ArrayFieldTemplateItemType} from "@rjsf/utils";
import IconButton from "../../IconButton";
import React from "react";

const ArrayFieldItemTemplate = ({
    children,
    disabled,
    hasMoveDown,
    hasMoveUp,
    hasRemove,
    hasToolbar,
    index,
    onDropIndexClick,
    onReorderClick,
    readonly,
    registry,
    uiSchema,
    }: ArrayFieldTemplateItemType) => {
    const canMoveItems = hasMoveUp || hasMoveDown;

    return (
        <div key={`array-item-${index}`} className="flex align-items-start gap-2 p-2 border-1 border-round">
            <div className="flex-grow-1">{children}</div>
            <div>
                {hasToolbar && (
                    <div className="flex flex-row">
                        {canMoveItems && (
                            <>
                                <IconButton
                                    icon="arrow-up"
                                    className="array-item-move-up"
                                    style={hasRemove ? {
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                    } : undefined}
                                    disabled={disabled || readonly || !hasMoveUp}
                                    onClick={onReorderClick(index, index - 1)}
                                />
                                <IconButton
                                    icon="arrow-down"
                                    style={{
                                        borderLeft: 0,
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                        ...(hasRemove ? {
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                        } : {}),
                                    }}
                                    disabled={disabled || readonly || !hasMoveDown}
                                    onClick={onReorderClick(index, index + 1)}
                                />
                            </>
                        )}

                        {hasRemove && (
                            <IconButton
                                icon="remove"
                                style={canMoveItems ? {
                                    borderLeft: 0,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                } : undefined}
                                disabled={disabled || readonly}
                                onClick={onDropIndexClick(index)}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
export default ArrayFieldItemTemplate;
