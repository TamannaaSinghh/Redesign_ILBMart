import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Category } from "@/lib/Data/Categories";
import "./CategoryCard.css";
import Link from "next/link";

interface Props {
  category: Category;
}

export const CategoryCard: React.FC<Props> = ({ category }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Link href={`/categories/123/cid/123/123`} className="no-underline">
        <div className="category-card cursor-pointer">
          <Card className="image-box">
            <div className="relative w-full h-full">
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                className="object-contain"
              />
            </div>
          </Card>
          <p className="paragraph">{category.name}</p>
        </div>
      </Link>
    </TooltipTrigger>
    {/* <TooltipContent>{category.name}</TooltipContent> */}
  </Tooltip>
);
