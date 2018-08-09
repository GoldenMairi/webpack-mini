<template>
	<div class="asider h-100 text-light pb-4" style="overflow-y:auto">
		<ul class="nav discover">
			<li class="nav-link px-2">
				<small class="text-muted">Discover</small>
			</li>
			<li>
				<router-link class="nav-link" to="/Youke">
					<i class="mr-2 ic ic-rest text-success"></i>
					<span>Youke</span>
				</router-link>
			</li>
			<li>
				<router-link class="nav-link" to="/Logined">
					<i class="mr-2 ic ic-computer text-warning"></i>
					<i class="badge badge-success float-right mt-1">16</i>
					<span>Logined</span>
				</router-link>
			</li>
			<li>
				<router-link class="nav-link" to="/Admin">
					<i class="mr-2 ic ic-sitting text-primary"></i>
					<span>Admin</span>
				</router-link>
			</li>
		</ul>
		<ul class="nav">
			<li class="nav-link px-2">
				<small class="text-muted">Interface</small>
			</li>
			<li>
				<a class="nav-link">
					<i class="mr-2 ic ic-rest"></i>
					<i class="ic ic-left float-right text-muted"></i>
					<span>Layouts</span>
				</a>
				<ul class="nav d-none">
					<li>
						<router-link class="nav-link" to="/Youke">
							<i class="mr-2 ic ic-right"></i>
							<span>Youke</span>
						</router-link>
					</li>
					<li>
						<router-link class="nav-link" to="/Logined">
							<i class="mr-2 ic ic-right"></i>
							<span>Logined</span>
						</router-link>
					</li>
				</ul>
			</li>
			<li>
				<a class="nav-link active">
					<i class="mr-2 ic ic-favor"></i>
					<i class="ic ic-unfold float-right text-muted"></i>
					<span>UI Kit</span>
				</a>
				<ul class="nav">
					<li>
						<router-link class="nav-link" to="/Buttons">
							<i class="mr-2 ic ic-right"></i>
							<span>Buttons</span>
						</router-link>
					</li>
					<li>
						<router-link class="nav-link" to="/Logined">
							<i class="mr-2 ic ic-right"></i>
							<i class="badge badge-primary float-right mt-1">35</i>
							<span>Icons</span>
						</router-link>
					</li>
					<li>
						<a class="nav-link active">
							<i class="mr-2 ic ic-right"></i>
							<i class="ic ic-unfold float-right text-muted"></i>
							<span>Table</span>
						</a>
						<ul class="nav">
							<li>
								<router-link class="nav-link" to="/Buttons">
									<i class="mr-2 ic ic-right"></i>
									<span>Table static</span>
								</router-link>
							</li>
							<li>
								<router-link class="nav-link" to="/Logined">
									<i class="mr-2 ic ic-right"></i>
									<span>DataTable</span>
								</router-link>
							</li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.asider {
  $asider-bg: #181f24;
  $nav-bg-1: #181f24;
  $nav-bg-2: #181f24;
  $nav-bg-3: #0d1215;
  $discover-bg: #232c32;
  $hover-bg: #2c3942;
  background-color: $asider-bg;

  @include scroll(6px, false, $asider-bg);
  font-family: "Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif;
  .nav {
    flex-direction: column;
    background-color: $nav-bg-1;
    &.discover {
      background-color: $discover-bg !important;
    }
    .nav {
      background-color: $nav-bg-2;
      .nav {
        background-color: $nav-bg-3;
      }
    }
  }
  a {
    transition: background-color 0.3s ease-in-out 0s;
    color: #8ca1af;
    &:hover,
    &.active {
      color: #fff;
      background-color: $hover-bg;
    }
  }
}
</style>
