import React, { useCallback, memo, useMemo } from "react";
import { Searchbar, useTheme } from "react-native-paper";
import { SEARCH } from "../locales/languagesConst";

const SearchCard = memo(({ query, setQuery, destination, setData, category, t }) => {
    const { colors } = useTheme();

    const categoryItems = useMemo(() =>
        destination?.[category] || [],
        [destination, category]
    );


    const filterCards = useCallback((text) => {
        setQuery(text);

        if (!text.trim()) {
            setData(categoryItems);
            return;
        }

        const lowerText = text.toLowerCase();
        const filteredItems = categoryItems.filter(item =>
            item.name?.toLowerCase().includes(lowerText)
        );

        setData(filteredItems);
    }, [categoryItems, setData]);

    return (
        <Searchbar
            placeholder={t(SEARCH.SEARCH)}
            mode="bar"
            style={{ backgroundColor: colors.surface }}
            value={query}
            onChangeText={filterCards}
            onClearIconPress={() => setQuery("")}
            autoCorrect={false}
        />
    );
});

export default SearchCard;