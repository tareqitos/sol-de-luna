import React, { useState, useCallback, memo } from "react";
import { Searchbar, useTheme } from "react-native-paper";
import { SEARCH } from "../locales/languagesConst";

const SearchCard = memo(({ destination, setData, category, t }) => {
    const { colors } = useTheme();
    const [query, setQuery] = useState("");

    const filterCards = useCallback((text) => {
        setQuery(text);

        if (!text.trim()) {
            setData(destination?.[category] || []);
            return;
        }

        const categoryItems = destination?.[category] || [];
        const filteredItems = categoryItems.filter(item =>
            item.name?.toLowerCase().includes(text.toLowerCase())
        );

        setData(filteredItems);
    }, [destination, category, setData]);

    return (
        <Searchbar
            placeholder={t(SEARCH.SEARCH)}
            mode="bar"
            style={{ backgroundColor: colors.surface }}
            value={query}
            onChangeText={filterCards}
        />
    );
});

export default SearchCard;