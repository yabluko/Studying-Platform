import {Tabs, TabsContent, TabsList, TabsTrigger} from "@radix-ui/react-tabs";

interface Tab {
    value: string;
    label: string;
    content: React.ReactNode;
}

interface DynamicTabsProps {
    tabs: Tab[];
    defaultValue: string;
}

const DynamicTabs: React.FC<DynamicTabsProps> = ({tabs, defaultValue}) => {
    return (
        <Tabs defaultValue={defaultValue}>
            <TabsList
                className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="inline-flex items-center justify-center whitespace-nowrap py-1 text-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    >
                        <span className="hover:text-gray-350">{tab.label}</span>
                    </TabsTrigger>
                ))}
            </TabsList>
            <div className="-mx-[84px] py-6 bg-gray-11 min-h-[423px]">
            {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className=""> 
                    {tab.content}
                </TabsContent>
            ))}
            </div>
        </Tabs>
    );
};

export default DynamicTabs;