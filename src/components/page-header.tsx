import { cn } from "@/lib/utils";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
}

export function PageHeader({ title, description, className, children, ...props }: PageHeaderProps) {
    return (
        <div className={cn("flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8", className)} {...props}>
            <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline text-foreground">
                    {title}
                </h1>
                {description && <p className="text-muted-foreground">{description}</p>}
            </div>
            {children && <div className="flex shrink-0 gap-2">{children}</div>}
        </div>
    )
}
