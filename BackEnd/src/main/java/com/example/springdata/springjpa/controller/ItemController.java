package com.example.springdata.springjpa.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
	@GetMapping("getItems/{page}/{size}")
	Page<ItemDTO> getAllItem(@PathVariable int page, @PathVariable int size)
	{
		return this.transformarDTO(itemService.getAllItems(PageRequest.of(page, size)), PageRequest.of(page, size));
	}
	
	@Secured({"ROLE_ADMIN","ROLE_USER"})
	@GetMapping("getItemsVenta/{id}/{page}/{size}")
	Page<ItemDTO> getItemsByVenta(@PathVariable long id, @PathVariable int page, @PathVariable int size)
	{
		return this.transformarDTO(itemService.getItemsByVenta(id, PageRequest.of(page, size)), PageRequest.of(page, size));
	}
	
	
	@Secured("ROLE_ADMIN")
	@GetMapping("getItemsProducto/{id}")
	boolean getItemProducto(@PathVariable long id)
	{
		if(itemService.getItemsByProducto(id).isEmpty())
		{
			return true;
		}else
			return false;
	}
	
	@Secured({"ROLE_ADMIN","ROLE_USER"})
	@PutMapping
    public boolean put() {
        return true;
    }
	
	
	@Secured({"ROLE_ADMIN","ROLE_USER"})
	@PostMapping
    public boolean post(@RequestBody Item newItem) {
		if(this.itemService.addItem(newItem) != null)
		{
			return true;
		}
        return false;
    }
	
	@Secured({"ROLE_ADMIN","ROLE_USER"})
	@PostMapping("agregarItems")
    public boolean agregarItems(@RequestBody List<Item> newItems) {
		for (Item item : newItems) {
			if(this.itemService.addItem(item) == null)
			{
				return false;
			}
		}
        return true;
    }
	
	@Secured("ROLE_ADMIN")
	@DeleteMapping
    public boolean delete() {
		itemService.deleteAllItems();
        return true;
    }
	
	
	public Page<ItemDTO> transformarDTO(Page<Item> items, Pageable pageable)
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
		Page<ItemDTO> pageItemsDTO = new PageImpl<>(itemsDTO, pageable, items.getTotalElements());
		return pageItemsDTO;
	}


}
