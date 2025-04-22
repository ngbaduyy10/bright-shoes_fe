import { Button } from "../../components/ui/button.jsx";
import { Checkbox } from "../../components/ui/checkbox.jsx";
import { Label } from "../../components/ui/label.jsx";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "../../components/ui/dropdown-menu.jsx";
import {
    brandOptions,
    capitalizeFirstLetter,
    sortOptions,
} from "@/utils/index.js";
import { ArrowUpDownIcon, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import {getShoes} from "@/services/shoes.service.js";
import {getCategories} from "@/services/category.service.js";

const Collection = () => {
    const [sort, setSort] = useState("default");
    const [itemList, setItemList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();
            if (response.success) {
                setCategoryList(response.data);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchShoes = async () => {
            setLoading(true);
            const response = await getShoes({categories: selectedCategory, sort, keyword});
            if (response.success) {
                setItemList(response.data);
            }
            setLoading(false);
        };
        fetchShoes();
    }, [selectedCategory, sort, keyword]);

    const handleSelectCategory = (categoryId) => {
        if (selectedCategory.includes(categoryId)) {
            setSelectedCategory(selectedCategory.filter((id) => id !== categoryId));
        } else {
            setSelectedCategory([...selectedCategory, categoryId]);
        }
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="w-full overflow-hidden">
                    <img
                        alt="Banner"
                        src="https://authentic-shoes.com/wp-content/uploads/2024/09/20240904091932-1.webp"
                        className="w-full object-cover object-center"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 bg-background">
                    <div className="flex flex-col hidden md:block">
                        <div className="text-xl font-bold mb-3 py-2">
                            FILTERS
                        </div>
                        <div className="flex flex-col gap-2 border rounded-lg p-3 mb-3">
                            <div className="flex-between">
                                <h3 className="text-sm font-semibold">
                                    CATEGORIES
                                </h3>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-[24px] w-[24px] cursor-pointer hover:bg-primary hover:text-white"
                                >
                                    <RotateCcw />
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {categoryList.map((category) => (
                                    <Label className="flex items-center gap-2 text-foreground" key={category.id}>
                                        <Checkbox
                                            checked={
                                                selectedCategory.length > 0 &&
                                                selectedCategory.includes(category.id)
                                            }
                                            onCheckedChange={() => handleSelectCategory(category.id)}
                                        />
                                        {capitalizeFirstLetter(category.name)}
                                    </Label>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 border rounded-lg p-3">
                            <div className="flex-between">
                                <h3 className="text-sm font-semibold">
                                    BRANDS
                                </h3>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-[24px] w-[24px] cursor-pointer hover:bg-primary hover:text-white"
                                >
                                    <RotateCcw />
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {brandOptions.map((option) => (
                                    <Label
                                        className="flex items-center gap-2 text-foreground"
                                        key={option.id}
                                    >
                                        <Checkbox />
                                        {option.label}
                                    </Label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center justify-end sm:justify-between mb-3">
                            <div className="text-xl font-bold py-2 hidden sm:block">
                                COLLECTIONS
                            </div>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="text"
                                    placeholder="Search"
                                    className="sm:w-[250px] lg:w-[400px]"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex items-center gap-1 cursor-pointer h-[36px] hover:bg-primary hover:text-white"
                                        >
                                            <ArrowUpDownIcon className="h-4 w-4" />
                                            <span>Sort by</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-[200px]"
                                    >
                                        <DropdownMenuRadioGroup
                                            value={sort}
                                            onValueChange={(value) =>
                                                setSort(value)
                                            }
                                        >
                                            {sortOptions.map((sortItem) => (
                                                <DropdownMenuRadioItem
                                                    value={sortItem.id}
                                                    key={sortItem.id}
                                                    className="cursor-pointer focus:bg-primary focus:text-white"
                                                >
                                                    {sortItem.label}
                                                </DropdownMenuRadioItem>
                                            ))}
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {loading ? (
                                Array(10).fill(0).map((_, index) => (
                                    <div className="cursor-pointer rounded-lg" key={index}>
                                        <div className="overflow-hidden rounded-lg">
                                            <Skeleton className="h-48 w-full"/>
                                        </div>
                                        <Skeleton className="h-4 w-3/4 mt-2"/>
                                        <Skeleton className="h-4 w-1/4 mt-1"/>
                                    </div>
                                ))
                            ) : (
                                itemList.length > 0 ? (
                                    itemList.map((item) => (
                                        <ItemCard key={item.id} item={item}/>
                                    ))
                                ) : (
                                    <div className="col-span-5 text-center text-lg font-semibold">
                                        No items found
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Collection;
