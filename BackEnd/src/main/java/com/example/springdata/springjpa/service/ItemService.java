package com.example.springdata.springjpa.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.example.springdata.springjpa.model.Item;

public interface ItemService {
	
	Page<Item> getAllItems(PageRequest pageRequest);

	void deleteAllItems();

	Page<Item> getItemsByVenta(long id, PageRequest pageRequest);

	Item addItem(Item newItem);

	List<Item> getItemsByProducto(long id);

}
