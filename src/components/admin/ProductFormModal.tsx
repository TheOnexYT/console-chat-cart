import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductFormModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ open, setOpen, onSubmit }) => {
  const { toast } = useToast();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productRating, setProductRating] = useState('');
  const [productFeatures, setProductFeatures] = useState('');
  const [productSpecifications, setProductSpecifications] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name: productName,
      description: productDescription,
      price: Number(productPrice),
      image: productImage,
      category: productCategory,
      stock: Number(productStock),
      rating: Number(productRating),
      features: productFeatures,
      specifications: productSpecifications
    };
    
    try {
      onSubmit(formData);
      toast({
        title: "Producto creado exitosamente!",
        description: "El producto ha sido creado y agregado a la tienda.",
      });
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Algo salió mal.",
        description: "Hubo un error al crear el producto. Por favor, inténtalo de nuevo.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar nuevo producto</DialogTitle>
          <DialogDescription>
            Crea un nuevo producto para agregar a la tienda.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              type="text"
              id="name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descripción
            </Label>
            <Input
              type="text"
              id="description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Precio
            </Label>
            <Input
              type="number"
              id="price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Imagen
            </Label>
            <Input
              type="text"
              id="image"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Categoría
            </Label>
            <Select onValueChange={setProductCategory}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accion">Acción</SelectItem>
                <SelectItem value="aventura">Aventura</SelectItem>
                <SelectItem value="estrategia">Estrategia</SelectItem>
                <SelectItem value="rol">Rol</SelectItem>
                <SelectItem value="deportes">Deportes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Stock
            </Label>
            <Input
              type="number"
              id="stock"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
              className="col-span-3"
            />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rating" className="text-right">
              Rating
            </Label>
            <Input
              type="number"
              id="rating"
              value={productRating}
              onChange={(e) => setProductRating(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="features" className="text-right">
              Características
            </Label>
            <Input
              type="text"
              id="features"
              value={productFeatures}
              onChange={(e) => setProductFeatures(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="specifications" className="text-right">
              Especificaciones
            </Label>
            <Input
              type="text"
              id="specifications"
              value={productSpecifications}
              onChange={(e) => setProductSpecifications(e.target.value)}
              className="col-span-3"
            />
          </div>
          <Button type="submit">Crear producto</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;
