import { Button } from '../../components/ui/button.jsx';
import { Checkbox } from '../../components/ui/checkbox.jsx';
import { Label } from '../../components/ui/label.jsx';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '../../components/ui/dropdown-menu.jsx';
import {brandOptions, categoryOptions, sortOptions} from "@/utils/index.js";
import {ArrowUpDownIcon, RotateCcw} from "lucide-react";
import {useEffect, useState} from "react";
import ItemCard from "@/components/ItemCard.jsx";
import {Input} from "@/components/ui/input.jsx";
import {getShoes} from "@/services/shoes.service.js";

const Collection = () => {
    const [sort, setSort] = useState("default");
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        const fetchShoes = async () => {
            const response = await getShoes();
            if (response.success) {
                setItemList(response.data);
            }
        }
        fetchShoes();
    }, []);

    return (
        <>
            <div className="flex flex-col">
                <div className="w-full overflow-hidden">
                    <img
                        alt="Banner"
                        src="https://authentic-shoes.com/wp-content/uploads/2024/12/Giay-Nau.webp"
                        className="w-full object-cover object-center"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 bg-background">
                    <div className="flex flex-col hidden md:block">
                        <div className="text-xl font-bold mb-3 py-2">FILTERS</div>
                        <div className="flex flex-col gap-2 border rounded-lg p-3 mb-3">
                            <div className="flex-between">
                                <h3 className="text-sm font-semibold">CATEGORIES</h3>
                                <Button size="sm" variant="outline"
                                        className="h-[24px] w-[24px] cursor-pointer hover:bg-primary hover:text-white">
                                    <RotateCcw/>
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {categoryOptions.map((option) => (
                                    <Label className="flex items-center gap-2 text-foreground" key={option.id}>
                                        <Checkbox/>
                                        {option.label}
                                    </Label>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 border rounded-lg p-3">
                            <div className="flex-between">
                                <h3 className="text-sm font-semibold">BRANDS</h3>
                                <Button size="sm" variant="outline"
                                        className="h-[24px] w-[24px] cursor-pointer hover:bg-primary hover:text-white">
                                    <RotateCcw/>
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {brandOptions.map((option) => (
                                    <Label className="flex items-center gap-2 text-foreground" key={option.id}>
                                        <Checkbox/>
                                        {option.label}
                                    </Label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center justify-end sm:justify-between mb-3">
                            <div className="text-xl font-bold py-2 hidden sm:block">COLLECTIONS</div>
                            <div className="flex items-center gap-2">
                                <Input type="text" placeholder="Search" className="sm:w-[250px] lg:w-[400px]"/>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex items-center gap-1 cursor-pointer hover:bg-primary hover:text-white h-[36px]"
                                        >
                                            <ArrowUpDownIcon className="h-4 w-4"/>
                                            <span>Sort by</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[200px]">
                                        <DropdownMenuRadioGroup
                                            value={sort}
                                            onValueChange={(value) => setSort(value)}
                                        >
                                            {sortOptions.map((sortItem) => (
                                                <DropdownMenuRadioItem
                                                    value={sortItem.id}
                                                    key={sortItem.id}
                                                >
                                                    {sortItem.label}
                                                </DropdownMenuRadioItem>
                                            ))}
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {itemList.map((item) => (
                                <ItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Collection;