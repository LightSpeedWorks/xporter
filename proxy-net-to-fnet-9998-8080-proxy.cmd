@pushd %~dp0
@if "%XPORTER_PROXY_FOLDER%" == "" (
	set XPORTER_PROXY_FOLDER=work
	if not exist work mkdir work
)
@pause
@echo %XPORTER_PROXY_FOLDER%
node net-fnet %XPORTER_PROXY_FOLDER% 9998 proxy 8080
@pause
@popd
