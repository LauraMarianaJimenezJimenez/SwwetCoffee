package com.example.springdata.springjpa;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

import com.example.springdata.springjpa.model.Categoria;
import com.example.springdata.springjpa.model.Item;
import com.example.springdata.springjpa.model.Producto;
import com.example.springdata.springjpa.model.Usuario;
import com.example.springdata.springjpa.model.Venta;
import com.example.springdata.springjpa.repository.ItemRepository;
import com.example.springdata.springjpa.repository.ProductoRepository;
import com.example.springdata.springjpa.repository.UserRepositoryWithQuery;
import com.example.springdata.springjpa.repository.VentaRepository;


@Configuration
class LoadData {

	@Autowired
	UserRepositoryWithQuery usuarioRepository;

	@Autowired
	VentaRepository ventaRepository;

	@Autowired
	ItemRepository itemRepository;

	@Autowired
	ProductoRepository productoRepository;

	@Bean
	CommandLineRunner initDatabase() {
		return args -> {
			System.out.println("Probando los repositorios Spring Data JPA");


			Producto p1 = new Producto();
			p1.setNombre("Frappuccino");
			p1.setDescripcion("Café helado con crema chantilly mediano");
			p1.setImagen("https://globalassets.starbucks.com/assets/87ab7a1c8b7b492cbc1d5c5d44e1007b.jpg?impolicy=1by1_wide_1242");
			p1.setPrecio(5000);
			p1.setCategoria(Categoria.BEBIDAS);
			p1.setEditar(false);
			p1.setActivo(true);
			productoRepository.save(p1);

			Producto p2 = new Producto();
			p2.setNombre("Cappuccino");
			p2.setDescripcion("Café con crema y latte");
			p2.setImagen("https://mx.jura.com/-/media/global/images/coffee-recipes/images-redesign-2020/cappuccino_2000x1400px.jpg?h=1400&la=es&w=2000&hash=4D78B3CB71BEC9A3D633DB7A3CF84712E1633670");
			p2.setPrecio(4000);
			p2.setCategoria(Categoria.BEBIDAS);
			p2.setEditar(false);
			p2.setActivo(true);
			productoRepository.save(p2);

			Producto p3 = new Producto();
			p3.setNombre("Mocaccino");
			p3.setDescripcion("Café con crema latte y chocolate");
			p3.setImagen("https://cdn.queapetito.com/wp-content/uploads/2019/05/Mocaccino-o-caf%C3%A9-de-moca-600x469.jpg");
			p3.setPrecio(4000);
			p3.setCategoria(Categoria.BEBIDAS);
			p3.setEditar(false);
			p3.setActivo(true);
			productoRepository.save(p3);


			Producto p4 = new Producto();
			p4.setNombre("Espresso");
			p4.setDescripcion("Café puro y concentrado");
			p4.setImagen("https://dam.cocinafacil.com.mx/wp-content/uploads/2013/04/cafe-espresso.jpg");
			p4.setPrecio(2000);
			p4.setCategoria(Categoria.BEBIDAS);
			p4.setEditar(false);
			p4.setActivo(true);
			productoRepository.save(p4);


			Producto p5 = new Producto();
			p5.setNombre("Rollo de Cannella");
			p5.setDescripcion("Rico pastel hecho de canela en forma de espiral");
			p5.setImagen("https://www.midiariodecocina.com/wp-content/uploads/2015/08/Rollos-de-canela01.jpg");
			p5.setPrecio(2000);
			p5.setCategoria(Categoria.PASTELERIA);
			p5.setEditar(false);
			p5.setActivo(true);
			productoRepository.save(p5);


			Producto p6 = new Producto();
			p6.setNombre("Galletas de Avena");
			p6.setDescripcion("Galleta elaborado en base a la harina de trigo mezclada con el cereal de avena");
			p6.setImagen("https://t2.rg.ltmcdn.com/es/images/3/0/3/galletas_de_avena_faciles_y_rapidas_67303_600_square.jpg");
			p6.setPrecio(1800);
			p6.setCategoria(Categoria.PASTELERIA);
			p6.setEditar(false);
			p6.setActivo(true);
			productoRepository.save(p6);

			Producto p7 = new Producto();
			p7.setNombre("Croissant de Mantequilla");
			p7.setDescripcion("Croissant salado hecho con masa de hojaldre y margarina");
			p7.setImagen("https://okdiario.com/img/2019/01/30/croissant-de-mantequilla.jpg%22");
			p7.setPrecio(2500);
			p7.setCategoria(Categoria.PASTELERIA);
			p7.setEditar(false);
			p7.setActivo(true);
			productoRepository.save(p7);

			Producto p8 = new Producto();
			p8.setNombre("Almojabana");
			p8.setDescripcion("Panecillo dulce típico de Latino America");
			p8.setImagen("https://www.sweetysalado.com/wp-content/uploads/2015/01/DSC_0068N.jpg%22");
			p8.setPrecio(1000);
			p8.setCategoria(Categoria.PASTELERIA);
			p8.setEditar(false);
			p8.setActivo(true);
			productoRepository.save(p8);

			Producto p9 = new Producto();
			p9.setNombre("Coffee Scrub 250g");
			p9.setDescripcion("Sabor pleno y regusto intenso, con matices caramelizados, gran cuerpo y cremosidad");
			p9.setImagen("https://sc02.alicdn.com/kf/HTB13fYRX5jrK1RjSsplq6xHmVXaS/201628904/HTB13fYRX5jrK1RjSsplq6xHmVXaS.jpg_.webp");
			p9.setPrecio(12700);
			p9.setCategoria(Categoria.GRANO);
			p9.setEditar(false);
			p9.setActivo(true);
			productoRepository.save(p9);



			Producto p10 = new Producto();
			p10.setNombre("Agora Café 200g");
			p10.setDescripcion("Etiquetas privadas, exfoliante, tratamiento anticelulítico, café Arábica, exfoliante.");
			p10.setImagen("https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202008/17/00120602000034____6__600x600.jpg");
			p10.setPrecio(18000);
			p10.setCategoria(Categoria.GRANO);
			p10.setEditar(false);
			p10.setActivo(true);
			productoRepository.save(p10);

			Producto p11 = new Producto();
			p11.setNombre("Café Flores 100g");
			p11.setDescripcion("Granos nacionales de café Premium. Grano rojo.");
			p11.setImagen("https://sc04.alicdn.com/kf/Ub566bc983a4d433da61e4dc596c50b8ek.jpg");
			p11.setPrecio(15000);
			p11.setCategoria(Categoria.GRANO);
			p11.setEditar(false);
			p11.setActivo(true);
			productoRepository.save(p11);

			Producto p12 = new Producto();
			p12.setNombre("Café Flores 30g");
			p12.setDescripcion("Granos de café Sirianni cubiertos de cocolate, combinación extraordinaria.");
			p12.setImagen("https://www.chedraui.com.mx/medias/7506161215893-00-CH1200Wx1200H?context=bWFzdGVyfHJvb3R8MTA3ODQ5fGltYWdlL2pwZWd8aGZhL2gxOC8xMDU3MTc5NTIzNDg0Ni5qcGd8Nzc5ODZmMGNkOGQ2N2FjNDE5ZTQ3YTYyYjc5NjdhYjJlODcxYThiYjllZmQ5NzY1M2I5YTM1M2NmYWVmZmY2YQ%22");
			p12.setPrecio(8000);
			p12.setCategoria(Categoria.GRANO);
			p12.setEditar(false);
			p12.setActivo(true);
			productoRepository.save(p12);

			Usuario usuario = new Usuario();
			usuario.setAdmin(false);
			usuario.setApellido("Perez");
			usuario.setCelular(300);
			usuario.setContrasena("12345");
			usuario.setEmail("chuchoperez@gmail.com");
			usuario.setNombre("Chucho");
			usuarioRepository.save(usuario);
			
			Usuario admin = new Usuario();
			admin.setAdmin(true);
			admin.setApellido("Martinez");
			admin.setCelular(301);
			admin.setContrasena("Admin");
			admin.setEmail("admin@gmail.com");
			admin.setNombre("Maria");
			usuarioRepository.save(admin);
		

			Venta compra1 = new Venta();
			compra1.setFecha(getDate("06/03/2021"));
			compra1.setUsuario(usuario);
			compra1.setValor(40000);
			ventaRepository.save(compra1);
			
			Venta compra2 = new Venta();
			compra2.setFecha(getDate("06/12/2021"));
			compra2.setUsuario(usuario);
			compra2.setValor(34700);
			ventaRepository.save(compra2);

			Item i1 = new Item();
			i1.setCantidad(1);
			i1.setPrecioVenta(4000);
			i1.setProducto(p2);
			i1.setVenta(compra1);
			itemRepository.save(i1);
			
			Item i2 = new Item();
			i2.setCantidad(2);
			i2.setPrecioVenta(18000);
			i2.setProducto(p10);
			i2.setVenta(compra1);
			itemRepository.save(i2);
			
			Item i3 = new Item();
			i3.setCantidad(3);
			i3.setPrecioVenta(2000);
			i3.setProducto(p4);
			i3.setVenta(compra2);
			itemRepository.save(i3);

			Item i4 = new Item();
			i4.setCantidad(2);
			i4.setPrecioVenta(8000);
			i4.setProducto(p12);
			i4.setVenta(compra2);
			itemRepository.save(i4);

			Item i5 = new Item();
			i5.setCantidad(1);
			i5.setPrecioVenta(12700);
			i5.setProducto(p9);
			i5.setVenta(compra2);
			itemRepository.save(i5);




//			Usuario u = usuarioRepository.findByEmail("se@me.com");
//			System.out.println(u);

			//imprimir("Usuarios que se llaman Raúl: ", u);
			//			Usuario usu = users.get(0);
			//			for (Venta v : usu.compras) {
			//				System.out.println("Venta ID: " + v.id + " -Fecha Compra: " + v.fecha.toString());
			//				for (Item i : v.items) {
			//					System.out.println("ID item: " + i.id + " - Cantidad: " + i.cantidad + " -Precio: " + i.precioVenta + "- NombrePro: " + i.producto.descripcion);
			//					
			//				}
			//			}


			//			users = UsuarioRepository.findAll();	
			//			imprimir("Todos los usuarios", users);
			//			
			//			// Accediendo a la segunda pagina de Usuario para un tamaño de pagina de 10,
			//			// ordenando por firstname de manera ascendente
			//			Page<Usuario> page = UsuarioRepository.findAll(PageRequest.of(0, 10, Sort.by(Direction.ASC, "firstname")));
			//			if (page.hasContent()) {
			//				System.out.println("Total de elementos:"+ page.getTotalElements());
			//				System.out.println("Total de paginas:"+ page.getTotalPages());
			//				imprimir("Usuarios de la pagina: "+ page.getNumber(),  page.getContent());
			//			}

		};
	}

	private void imprimir(String message, List<Usuario> users) {
		System.out.println(message);

		System.out.println("Usuarios encontrados: "+users.size());

		for (Usuario u : users) {
			System.out.println(u);
		}
	}
	Date getDate(String fecha) throws ParseException{
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		return dateFormat.parse(fecha);
	}

}
