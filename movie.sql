USE [Movie]
GO

-- Chèn vào bảng user_type
SET IDENTITY_INSERT [dbo].[user_type] ON
INSERT [dbo].[user_type] ([id], [role_name]) VALUES (1, N'admin')
INSERT [dbo].[user_type] ([id], [role_name]) VALUES (2, N'user')
SET IDENTITY_INSERT [dbo].[user_type] OFF
GO

-- Chèn vào bảng category
SET IDENTITY_INSERT [dbo].[category] ON
INSERT [dbo].[category] ([id], [name], [description]) VALUES (1, N'Phim Bộ', N'Phim nhiều tập')
INSERT [dbo].[category] ([id], [name], [description]) VALUES (2, N'Phim Lẻ', N'Phim một tập')
SET IDENTITY_INSERT [dbo].[category] OFF
GO

-- Chèn vào bảng movie
SET IDENTITY_INSERT [dbo].[movie] ON
INSERT [dbo].[movie] ([id], [name], [description], [status], [release_year], [total_ep], [thumbnail], [trailer_url]) VALUES (1, N'MINH LAN TRUYỆN', N'Phim tình cảm Trung Quốc', N'Released', 2025, 40, N'https://bloganchoi.com/wp-content/uploads/2022/07/co-dinh-diep-1-1.jpg', N'https://www.youtube.com/embed/d71arB5NtUE')
INSERT [dbo].[movie] ([id], [name], [description], [status], [release_year], [total_ep], [thumbnail], [trailer_url]) VALUES (2, N'CHÂN HOÀN TRUYỆN', N'Phim cung đấu Trung Quốc', N'Released', 2025, 80, N'https://tintuc-divineshop.cdn.vccloud.vn/wp-content/uploads/2022/07/chan-hoan-truyen-ung-chinh-co-tung-yeu-chan-hoan-hay-khong_62d0bd7798a37.jpeg', N'https://www.youtube.com/embed/vWfRK1_YRh4')
INSERT [dbo].[movie] ([id], [name], [description], [status], [release_year], [total_ep], [thumbnail], [trailer_url]) VALUES (3, N'CHIẾC VÒNG NGỌC BÍCH', N'Phim tình cảm Việt Nam', N'Released', 2025, 40, N'https://static3.thvli.vn/assets/thumbnail/2025/04/03/ojc7pyvj_ThumbTHVLi-(408x230)-ChiecVongNgocBich.jpg', N'https://www.youtube.com/embed/kI0dWtUEvfw')
INSERT [dbo].[movie] ([id], [name], [description], [status], [release_year], [total_ep], [thumbnail], [trailer_url]) VALUES (4, N'PHÍA TRƯỚC LÀ BẦU TRỜI', N'Phim tình cảm Việt Nam', N'Released', 2025, 9, N'https://bazaarvietnam.vn/wp-content/uploads/2021/10/phim-truyen-hinh-viet-nam-hay-nhat-moi-thoi-dai-1-e1634028081345.jpeg', N'https://www.youtube.com/embed/m79IRgcLtJg')
INSERT [dbo].[movie] ([id], [name], [description], [status], [release_year], [total_ep], [thumbnail], [trailer_url]) VALUES (5, N'KÍNH VẠN HOA', N'Phim tình cảm Việt Nam', N'Released', 2025, 40, N'https://i.pinimg.com/736x/ff/61/db/ff61db3e6f805463b15c9a169bd7708c.jpg', N'https://www.youtube.com/embed/wcPMK1Cjs4s')
INSERT [dbo].[movie] ([id], [name], [description], [status], [release_year], [total_ep], [thumbnail], [trailer_url]) VALUES (6, N'CÔ DÂU ĐẠI CHIẾN', N'Phim tình cảm', N'Released', 2025, 1, N'https://hkfilm.com.vn/wp-content/uploads/2013/06/32D1_4F28FA551.jpg', N'https://www.youtube.com/embed/upzfXF-2P_k')
INSERT [dbo].[movie] ([id], [name], [description], [status], [release_year], [total_ep], [thumbnail], [trailer_url]) VALUES (7, N'THẦN BÀI 1', N'Phim hài hành động', N'Released', 2025, 1, N'https://danviet.mediacdn.vn/upload/1-2016/images/2016-02-16/1455615063-than-bai-1.jpg', N'https://www.youtube.com/embed/I_pcZmV-ctA')
INSERT [dbo].[movie] ([id], [name], [description], [status], [release_year], [total_ep], [thumbnail], [trailer_url]) VALUES (8, N'THẦN BÀI 2', N'Phim hài hành động', N'Released', 2025, 1, N'https://thuthuatnhanh.com/wp-content/uploads/2022/02/Anh-than-bai-cuc-ngau.jpg', N'https://www.youtube.com/embed/I_pcZmV-ctA')
INSERT [dbo].[movie] ([id], [name], [description], [status], [release_year], [total_ep], [thumbnail], [trailer_url]) VALUES (9, N'THẦN BÀI 3', N'Phim hài hành động', N'Released', 2025, 1, N'https://i.imgur.com/HElk7qO.jpg', N'https://www.youtube.com/embed/I_pcZmV-ctA')
INSERT [dbo].[movie] ([id], [name], [description], [status], [release_year], [total_ep], [thumbnail], [trailer_url]) VALUES (10, N'BỐ GIÀ', N'Phim hài tình cảm', N'Released', 2025, 1, N'https://i.ytimg.com/vi/oA-BhGNK7qw/maxresdefault.jpg', N'https://www.youtube.com/embed/rmPP-DRqEf0')
SET IDENTITY_INSERT [dbo].[movie] OFF
GO


INSERT INTO [dbo].[movie_categories] ([movieId], [categoryId]) VALUES (1, 1)
INSERT INTO [dbo].[movie_categories] ([movieId], [categoryId]) VALUES (2, 1)
INSERT INTO [dbo].[movie_categories] ([movieId], [categoryId]) VALUES (3, 1)
INSERT INTO [dbo].[movie_categories] ([movieId], [categoryId]) VALUES (4, 1)
INSERT INTO [dbo].[movie_categories] ([movieId], [categoryId]) VALUES (5, 1)
INSERT INTO [dbo].[movie_categories] ([movieId], [categoryId]) VALUES (6, 2)
INSERT INTO [dbo].[movie_categories] ([movieId], [categoryId]) VALUES (7, 2)
INSERT INTO [dbo].[movie_categories] ([movieId], [categoryId]) VALUES (8, 2)
INSERT INTO [dbo].[movie_categories] ([movieId], [categoryId]) VALUES (9, 2)
INSERT INTO [dbo].[movie_categories] ([movieId], [categoryId]) VALUES (10, 2)


-- Chèn vào bảng episode
SET IDENTITY_INSERT [dbo].[episode] ON
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (1, N'https://www.youtube.com/embed/D5Rg_I8zO14', 1, 1)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (2, N'https://www.youtube.com/embed/Wcb-tkwgT6E', 2, 1)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (3, N'https://www.youtube.com/embed/BYojKBC3y1U', 3, 1)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (4, N'https://www.youtube.com/embed/5AXMjDETSIM&t=965s', 4, 1)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (5, N'https://www.youtube.com/embed/LE84YFNwkPM', 5, 1)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (6, N'https://www.youtube.com/embed/zYIe5j_j-x0&t=1800s', 6, 1)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (7, N'https://www.youtube.com/embed/-30Sdu2VP7s&t=1239s', 7, 1)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (8, N'https://www.youtube.com/embed/Y_ayHUbMvkk', 8, 1)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (9, N'https://www.youtube.com/embed/tsdByf3-4Tw', 9, 1)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (10, N'https://www.youtube.com/embed/E9xdF1d7mjY', 10, 1)

INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (11, N'https://www.youtube.com/embed/dvN-8pIdlxc', 1, 2)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (12, N'https://www.youtube.com/embed/GnVfBxQPZ38', 2, 2)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (13, N'https://www.youtube.com/embed/648e3sA-IrU', 3, 2)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (14, N'https://www.youtube.com/embed/HD0Lk5Ayx_g', 4, 2)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (15, N'https://www.youtube.com/embed/yu0Q4h2IvUY', 5, 2)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (16, N'https://www.youtube.com/embed/4iwDhwOy7bo', 6, 2)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (17, N'https://www.youtube.com/embed/LwyTdrOoYzc', 7, 2)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (18, N'https://www.youtube.com/embed/_1_a13cJz3w', 8, 2)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (19, N'https://www.youtube.com/embed/_EFiQdDcDAg', 9, 2)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (20, N'https://www.youtube.com/embed/xMjIDd3K1sg', 10, 2)

INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (21, N'https://www.youtube.com/embed/-h4ngTpLXg4', 1, 3)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (22, N'https://www.youtube.com/embed/bZh8pb9jDjE', 2, 3)

INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (23, N'https://www.youtube.com/embed/5e0O2rcVVMM', 1, 4)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (24, N'https://www.youtube.com/embed/PwIs231iU2Y', 2, 4)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (25, N'https://www.youtube.com/embed/TIi-rbZY3kY', 3, 4)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (26, N'https://www.youtube.com/embed/XTAkpQASxdQ', 4, 4)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (27, N'https://www.youtube.com/embed/YBw1zGP7dYA', 5, 4)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (28, N'https://www.youtube.com/embed/Pxf-uVQLseM', 6, 4)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (29, N'https://www.youtube.com/embed/O4_xM3DoG4A', 7, 4)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (30, N'https://www.youtube.com/embed/fgJiZ2rBVV0', 8, 4)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (31, N'https://www.youtube.com/embed/DHcrSMFViJo', 9, 4)

INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (32, N'https://www.youtube.com/embed/cG5ZZ2FB720', 1, 5)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (33, N'https://www.youtube.com/embed/KMj9cuiuzEs', 2, 5)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (34, N'https://www.youtube.com/embed/oyG6NNfa-PA', 3, 5)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (35, N'https://www.youtube.com/embed/n4mduwatyZ4', 4, 5)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (36, N'https://www.youtube.com/embed/Qtgnu9-yrQQ', 5, 5)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (37, N'https://www.youtube.com/embed/E8SLhtoYX2M', 6, 5)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (38, N'https://www.youtube.com/embed/7meIxJszTRA', 7, 5)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (39, N'https://www.youtube.com/embed/ZONqaPNki3E', 8, 5)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (40, N'https://www.youtube.com/embed/_ytTmJs5TFM', 9, 5)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (41, N'https://www.youtube.com/embed/T1Yw5t0cFug', 10, 5)

INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (42, N'https://www.youtube.com/embed/R32qmtihLEg', 1, 6)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (43, N'https://www.youtube.com/embed/D9XmRKXWAek', 1, 7)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (44, N'https://www.youtube.com/embed/RYsG9FqBw3w', 1, 8)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (45, N'https://www.youtube.com/embed/6zjB5_1ZWLY', 1, 9)
INSERT [dbo].[episode] ([id], [ep_link], [ep_number], [movieId]) VALUES (46, N'https://www.youtube.com/embed/oA-BhGNK7qw', 1, 10)
SET IDENTITY_INSERT [dbo].[episode] OFF
GO