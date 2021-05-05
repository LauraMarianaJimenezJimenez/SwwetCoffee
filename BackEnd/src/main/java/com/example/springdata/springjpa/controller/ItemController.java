package com.example.springdata.springjpa.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springdata.springjpa.dtos.ItemDTO;
import com.example.springdata.springjpa.dtos.VentaDTO;
import com.example.springdata.springjpa.model.Item;
import com.example.springdata.springjpa.model.Venta;
import com.example.springdata.springjpa.service.ItemService;

@RestController
@RequestMapping("items")
public class ItemController {
	
	@Autowired
	private ItemService itemService;
	
	@Secured({"ROLE_ADMIN","ROLE_USER"})
	@GetMapping("getItems")
	List<ItemDTO> getAllItem()
	{
		return this.transformarDTO(itemService.getAllItems());
	}
	
	@Secured({"ROLE_ADMIN","ROLE_USER"})
	@GetMapping("getItemsVenta/{id}")
	List<ItemDTO> getItemsByVenta(@PathVariable long id)
	{
		return this.transformarDTO(itemService.getItemsByVenta(id));
	}
	
	
	@Secured("ROLE_ADMIN")
	@GetMapping("getItemsProducto/{id}")
	boolean getItemProducto(@PathVariable long id)
	{
		if(this.transformarDTO(itemService.getItemsByProducto(id)).isEmpty())
		{
			return true;
		}else
			return false;
	}
	
	@Secured({"ROLE_ADMIN","ROLE_USER"})
	@PutMapping
    public String put() {
        return "Respuesta desde el metodo PUT";
    }
	
	
	@Secured({"ROLE_ADMIN","ROLE_USER"})
	@PostMapping
    public String post(@RequestBody Item newItem) {
		this.itemService.AddItem(newItem);
        return "Respuesta desde el metodo POST";
    }
	
	@Secured("ROLE_ADMIN")
	@DeleteMapping
    public String delete() {
		itemService.deleteAllItems();
        return "Respuesta desde el metodo DELETE";
    }
	
	
	public List<ItemDTO> transformarDTO(Iterable<Item> items)
	{
		List<ItemDTO> itemsDTO =  new ArrayList<ItemDTO>();

		for (Item i : items)
		{
			ItemDTO iDTO =  new ItemDTO();
			iDTO.setCantidad(i.getCantidad());
			iDTO.setNombreProducto(i.getProducto().getNombre());
			iDTO.setPrecioVenta(i.getPrecioVenta());
			itemsDTO.add(iDTO);
		}
		return itemsDTO;
	}


}
